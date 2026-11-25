"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { positionLocal, texture, uniform, uv, vec2 } from "three/tsl";
import { MeshBasicNodeMaterial, WebGPURenderer } from "three/webgpu";

import GlassControls from "@/components/glass/GlassControls";
import SplitDivider from "@/components/glass/SplitDivider";
import { createGlassMaterial, createGlassRelief, type GlassMaterial } from "@/glass/glassMaterial";
import {
  GLASS_SETTINGS,
  GLASS_TEXTURES,
  glassSettings,
  type GlassSettings,
  type GlassTextureId,
} from "@/glass/texturedGlass";
import { useGlassSettings, type GlassSettingsById } from "@/glass/useGlassSettings";

/** Sample size in px, as on the CSS sheet. */
const WIDTH = 280;
const HEIGHT = 210;
/** How much of a sample starts out behind the glass. */
const INITIAL_SPLIT = 0.56;
/** Backdrop rendered past each sample's frame, so glass at the edge has something to bend. */
const BLEED = 32;
/**
 * The largest canvas side, in device px. Some phone GPUs stop at 4096 (a taller WebGL canvas is
 * solid black there), and WebGPU stops at 8192 by default (a taller one stays blank).
 */
const MAX_CANVAS = 4096;

const INK = "#2b2e36";

/**
 * What sits behind every pane: a picture, static text, a scrolling line of text and a drifting
 * disc. It is laid out in sample px (x right, y up, so a point y px down the sample is at -y).
 */
function createBackdrop() {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-BLEED, WIDTH + BLEED, BLEED, -HEIGHT - BLEED, 0, 2);
  camera.position.z = 1;

  // The picture and the static text share one canvas, drawn at 2x once the image has loaded.
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH * 2;
  canvas.height = HEIGHT * 2;
  const context = canvas.getContext("2d");
  const picture = new THREE.CanvasTexture(canvas);
  picture.colorSpace = THREE.SRGBColorSpace;
  const image = new Image();
  image.onload = () => {
    if (!context) return;
    context.scale(2, 2);
    context.drawImage(image, 0, 0, WIDTH, HEIGHT);
    context.fillStyle = INK;
    context.font = "9px Arial, sans-serif";
    ["Text and images", "behind the glass", "live in the scene."].forEach((line, i) => {
      context.fillText(line, 14, 58 + i * 12);
    });
    context.font = "700 38px Georgia, serif";
    context.fillText("Aa", 14, 128);
    picture.needsUpdate = true;
  };
  image.src = "/glass/vase.svg";

  // The picture fills the sample; past its frame the edge pixels repeat into the bleed.
  const span = vec2((WIDTH + 2 * BLEED) / WIDTH, (HEIGHT + 2 * BLEED) / HEIGHT);
  const pictureMaterial = new MeshBasicNodeMaterial();
  pictureMaterial.colorNode = texture(picture, uv().sub(0.5).mul(span).add(0.5));
  const pictureMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(WIDTH + 2 * BLEED, HEIGHT + 2 * BLEED),
    pictureMaterial
  );
  pictureMesh.position.set(WIDTH / 2, -HEIGHT / 2, 0);

  // A line of text scrolling across the top: one repeating strip, drawn at 2x, whose UV slides.
  const strip = document.createElement("canvas");
  const stripContext = strip.getContext("2d");
  const phrase = "IMAGES  ·  TEXT  ·  MOTION  ·  ";
  const font = "700 22px Arial, sans-serif";
  if (stripContext) {
    stripContext.font = font;
    strip.width = Math.ceil(stripContext.measureText(phrase).width);
    strip.height = 32;
    // Resizing a canvas resets its drawing state.
    stripContext.font = font;
    stripContext.fillStyle = INK;
    stripContext.textBaseline = "middle";
    stripContext.fillText(phrase, 0, 16);
  }
  const ticker = new THREE.CanvasTexture(strip);
  ticker.colorSpace = THREE.SRGBColorSpace;
  ticker.wrapS = THREE.RepeatWrapping;
  const scroll = uniform(0);
  const repeats = (WIDTH + 2 * BLEED) / (strip.width / 2);
  const line = texture(ticker, vec2(uv().x.mul(repeats).add(scroll), uv().y));
  const tickerMaterial = new MeshBasicNodeMaterial({ transparent: true });
  tickerMaterial.colorNode = line.rgb;
  tickerMaterial.opacityNode = line.a;
  const tickerMesh = new THREE.Mesh(new THREE.PlaneGeometry(WIDTH + 2 * BLEED, 16), tickerMaterial);
  tickerMesh.position.set(WIDTH / 2, -18, 0.1);

  const disc = new THREE.Mesh(new THREE.CircleGeometry(9, 32), new THREE.MeshBasicMaterial({ color: "#1c8ea3" }));

  scene.add(pictureMesh, tickerMesh, disc);

  return {
    scene,
    camera,
    /** Moves the animated parts to where they are `seconds` in. */
    update(seconds: number) {
      scroll.value = seconds * 0.12;
      disc.position.set(150 + 70 * Math.sin(seconds * 0.7), -62 - 16 * Math.sin(seconds * 1.3), 0.2);
    },
    dispose() {
      image.onload = null;
      for (const mesh of [pictureMesh, tickerMesh, disc]) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      }
      picture.dispose();
      ticker.dispose();
    },
  };
}

/**
 * The glass sample sheet in WebGL. The glass can only bend what is drawn into the canvas, so the
 * picture, the text and the motion behind it are a small three.js scene, rendered once per frame
 * into a texture that all seventeen panes look through.
 */
export default function GlassSamplesThree() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Where each sample's glass ends, 0 to 1 across it, and the uniforms that carry it to the GPU.
  const [splits, setSplits] = useState(() => Object.keys(GLASS_TEXTURES).map(() => INITIAL_SPLIT));
  const splitUniforms = useRef<{ value: number }[]>([]);
  // How each glass is tuned, and the way to put that on the GPU once the scene exists.
  const [settings, setSettings] = useGlassSettings();
  const tuneGlasses = useRef<((all: GlassSettingsById) => void) | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const grid = gridRef.current;
    const canvas = canvasRef.current;
    if (!scroller || !grid || !canvas) return;

    const renderer = new WebGPURenderer({ canvas, alpha: true });
    renderer.setClearColor(0x000000, 0);

    const backdrop = createBackdrop();
    // Half floats keep the linear colours from banding; the mipmaps are what frosted glass reads.
    const target = new THREE.RenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
    });

    // Sample geometry starts at the sample's top-left corner, so `at` is the position inside a
    // sample in px with y down. three.js puts v = 0 at the top of a render target, so the
    // matching place in the backdrop texture runs the same way.
    const at = vec2(positionLocal.x, positionLocal.y.negate());
    const uvPerPx = vec2(1 / (WIDTH + 2 * BLEED), 1 / (HEIGHT + 2 * BLEED));
    const backdropUV = at.add(BLEED).mul(uvPerPx);
    const texelsPerPx = uniform(1);
    const view = { texture: target.texture, uv: backdropUV, uvPerPx, texelsPerPx };

    // Every sample is two quads of its full size: the clear view, and in front of it the glass,
    // cut off at that sample's dividing line.
    const frameMaterial = new MeshBasicNodeMaterial();
    frameMaterial.colorNode = texture(target.texture, backdropUV, 0);
    const frameGeometry = new THREE.PlaneGeometry(WIDTH, HEIGHT).translate(WIDTH / 2, -HEIGHT / 2, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 0, -1, 0, 2);
    camera.position.z = 1;
    const disposables: { dispose(): void }[] = [target, frameMaterial, frameGeometry];
    splitUniforms.current = [];
    const glasses = (Object.keys(GLASS_TEXTURES) as GlassTextureId[]).map((id) => {
      const relief = createGlassRelief(GLASS_TEXTURES[id]);
      const split = uniform(INITIAL_SPLIT * WIDTH);
      splitUniforms.current.push(split);
      if (relief) disposables.push(relief);

      const pane = new THREE.Mesh(frameGeometry, frameMaterial);
      pane.position.z = 0.1;
      const sample = new THREE.Group().add(new THREE.Mesh(frameGeometry, frameMaterial), pane);
      scene.add(sample);

      // Settings are uniforms, so tuning costs nothing, except between clear and frosted glass,
      // which are different shaders.
      let glass: GlassMaterial | null = null;
      const tune = (next: GlassSettings) => {
        if (glass && glass.frosted === next.blur > 0) {
          for (const key of GLASS_SETTINGS) glass.uniforms[key].value = next[key];
          return;
        }
        glass?.material.dispose();
        glass = createGlassMaterial(next, relief, view);
        glass.material.maskNode = at.x.lessThan(split);
        pane.material = glass.material;
      };
      tune(glassSettings(GLASS_TEXTURES[id]));
      return { id, sample, tune, dispose: () => glass?.material.dispose() };
    });
    tuneGlasses.current = (all) => glasses.forEach((glass) => glass.tune(all[glass.id]));

    // The DOM lays the sheet out; each sample is drawn over its slot, in the grid's own px.
    //
    // The canvas covers a window of the sheet around what is on screen, not the whole sheet: in
    // one column the sheet is taller than the largest canvas WebGPU allows, and such a canvas
    // stays blank. The canvas still scrolls with the page, so its picture stays glued to the DOM
    // between frames; every frame it is put back around the visible part and redrawn from there.
    const slots = grid.querySelectorAll<HTMLElement>("[data-sample]");
    let windowHeight = 0;
    let windowTop = -1;
    const layout = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      windowHeight = Math.min(grid.clientHeight, scroller.clientHeight * 2, Math.floor(MAX_CANVAS / ratio));
      windowTop = -1;
      canvas.style.height = `${windowHeight}px`;
      renderer.setPixelRatio(ratio);
      renderer.setSize(grid.clientWidth, windowHeight, false);
      camera.right = grid.clientWidth;
      target.setSize(Math.round((WIDTH + 2 * BLEED) * ratio), Math.round((HEIGHT + 2 * BLEED) * ratio));
      texelsPerPx.value = ratio;
      slots.forEach((slot, i) => glasses[i].sample.position.set(slot.offsetLeft, -slot.offsetTop, 0));
    };
    const placeWindow = () => {
      const screen = scroller.clientHeight;
      const scrolledPast = scroller.getBoundingClientRect().top - grid.getBoundingClientRect().top;
      const last = grid.clientHeight - windowHeight;
      // Moving the canvas costs a frame of scrolling smoothness, so it stays put while it still
      // covers the screen with a quarter of a screen to spare on each side.
      const spare = screen / 4;
      const coversAbove = windowTop === 0 || scrolledPast - spare >= windowTop;
      const coversBelow = windowTop === last || scrolledPast + screen + spare <= windowTop + windowHeight;
      if (windowTop >= 0 && coversAbove && coversBelow) return;
      const top = Math.round(Math.max(0, Math.min(scrolledPast - (windowHeight - screen) / 2, last)));
      if (top === windowTop) return;
      windowTop = top;
      canvas.style.transform = `translateY(${top}px)`;
      camera.top = -top;
      camera.bottom = -top - windowHeight;
      camera.updateProjectionMatrix();
    };
    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(grid);
    observer.observe(scroller);

    renderer.setAnimationLoop((time: number) => {
      placeWindow();
      backdrop.update(time / 1000);
      renderer.setRenderTarget(target);
      renderer.render(backdrop.scene, backdrop.camera);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      backdrop.dispose();
      tuneGlasses.current = null;
      glasses.forEach((glass) => glass.dispose());
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, []);

  // Declared after the setup above so that they also run once the uniforms exist.
  useEffect(() => {
    splits.forEach((split, i) => {
      const target = splitUniforms.current[i];
      if (target) target.value = split * WIDTH;
    });
  }, [splits]);

  useEffect(() => tuneGlasses.current?.(settings), [settings]);

  return (
    <div ref={scrollerRef} className="h-screen overflow-y-auto bg-background px-8 pb-12 pt-20 text-foreground">
      <div className="mx-auto max-w-[1192px]">
        <h1 className="mb-6 text-2xl font-semibold">Glass Samples, Three.js</h1>

        <div ref={gridRef} className="relative grid grid-cols-[repeat(auto-fill,280px)] gap-x-6 gap-y-5">
          <canvas ref={canvasRef} className="pointer-events-none absolute left-0 top-0 w-full" />
          {(Object.keys(GLASS_TEXTURES) as GlassTextureId[]).map((id, index) => (
            <figure key={id}>
              <div data-sample className="relative h-[210px]">
                <SplitDivider
                  label={`${GLASS_TEXTURES[id].name} glass coverage`}
                  value={splits[index]}
                  onChange={(value) => setSplits((current) => current.map((split, i) => (i === index ? value : split)))}
                />
              </div>
              <GlassControls
                id={id}
                texture={GLASS_TEXTURES[id]}
                settings={settings[id]}
                onChange={(next) => setSettings(id, next)}
                copies="three"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
