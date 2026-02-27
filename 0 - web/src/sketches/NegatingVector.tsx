"use client";

import { WebGPURenderer, MeshBasicNodeMaterial } from "three/webgpu";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Inspector } from "three/addons/inspector/Inspector.js";


import {
    float,
    vec2,
    vec3,
    time,
    viewportUV, // Built-in per-fragment UV in [0..1] across the screen.
    screenSize, // Built-in node giving viewport dimensions (x=width, y=height).
    length,
    normalize,
    sin,
    cos,
    smoothstep, //soft transition between 0 and 1
    clamp, //clamp(x, min, max): restrict x to the range [min, max].
    uniform,
    step,
    fract

} from "three/tsl"

export default function NegatingVector() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new WebGPURenderer({ canvas: canvasRef.current });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    const inspector = new Inspector();
    renderer.inspector = inspector;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a NodeMaterial that takes a TSL graph output (colorNode) as the pixel color.
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new MeshBasicNodeMaterial({ color: "#000" });
    
    const mesh = new THREE.Mesh(geometry, material);
    // Disable frustum culling because the quad is always meant to render.
    mesh.frustumCulled = false;

    scene.add(mesh);

    // -------------------------
    // 📘 Chapter 5.4: Negating a Vector
    // Goal: visualize that -p points opposite direction of p (flip through origin).
    // Strategy: treat each pixel position as a vector p and blend p <-> -p.
    // -------------------------
    
    // Get the per-fragment UV coordinate in [0..1] across the screen - left to right, top to bottom.
    const uv = viewportUV;
    
    // Remap uv from [0..1] to [-1..1] so the origin is screen centered
    const center = uv.mul(2.0).sub(1.0);

    // Compute aspect ratio (width/height) so "circles stay circles" in our coordinate span.
    const aspect = screenSize.x.div(screenSize.y);

    // Compute aspect corrected center coordinate for each pixel.
    const p = vec2(center.x.mul(aspect), center.y);

    // Parameters exposed in the built-in WebGPU inspector UI.
    const params = {
      speed: 0.8,
      vignetteOuter: 1.3,
      vignetteInner: 0.2,
      blue: 0.65,
      contrastScale: 0.35,
      contrastLift: 0.08,
      lineLength: 0.25,
      lineThickness: 0.01,
      lineOpacity: 1.0,
      fieldColorOpacity: 1.0,
      radius: 0.25,
    };

    // Uniforms are the shader-side values driven by GUI controls.
    const speedU = uniform(params.speed);
    const vignetteOuterU = uniform(params.vignetteOuter);
    const vignetteInnerU = uniform(params.vignetteInner);
    const blueU = uniform(params.blue);
    const contrastScaleU = uniform(params.contrastScale);
    const contrastLiftU = uniform(params.contrastLift);
    const lineLengthU = uniform(params.lineLength);
    const lineThicknessU = uniform(params.lineThickness);
    const lineOpacityU = uniform(params.lineOpacity);
    const fieldColorOpacityU = uniform(params.fieldColorOpacity);
    const radiusU = uniform(params.radius);

    const controls = inspector.createParameters("NegatingVector");
    controls.add(params, "speed", 0.1, 3.0, 0.01).onChange((value) => {
      speedU.value = value;
    });
    controls.add(params, "vignetteOuter", 0.2, 3.0, 0.01).onChange((value) => {
      vignetteOuterU.value = value;
    });
    controls.add(params, "vignetteInner", 0.0, 1.5, 0.01).onChange((value) => {
      vignetteInnerU.value = value;
    });
    controls.add(params, "blue", 0.0, 1.0, 0.01).onChange((value) => {
      blueU.value = value;
    });
    controls.add(params, "contrastScale", 0.0, 1.0, 0.01).onChange((value) => {
      contrastScaleU.value = value;
    });
    controls.add(params, "contrastLift", 0.0, 0.3, 0.01).onChange((value) => {
      contrastLiftU.value = value;
    });
    controls.add(params, "lineLength", 0.0, 0.25, 0.001).onChange((value) => {
      lineLengthU.value = value;
    });
    controls.add(params, "lineThickness", 0.002, 0.01, 0.001).onChange((value) => {
      lineThicknessU.value = value;
    });
    controls.add(params, "lineOpacity", 0.0, 1.0, 0.01).onChange((value) => {
      lineOpacityU.value = value;
    });
    controls.add(params, "fieldColorOpacity", 0.0, 1.0, 0.01).onChange((value) => {
      fieldColorOpacityU.value = value;
    });
    controls.add(params, "radius", 0.0, 0.25, 0.001).onChange((value) => {
      radiusU.value = value;
    });

    // Rotate p continuously over time so direction changes smoothly.
    const angle = time.mul(speedU);
    const c = cos(angle);
    const s = sin(angle);
    const v = vec2(
      p.x.mul(c).sub(p.y.mul(s)),
      p.x.mul(s).add(p.y.mul(c))
    );

    // Compute direction by normalizing; we color-code direction regardless of magnitude.
    const dir = normalize(v);

    // Compute magnitude to drive subtle brightness and a vignette mask.
    const mag = length(v);

    // Build a vignette: high near center, low near edges, for pleasing composition.
    const vignette = smoothstep(vignetteOuterU, vignetteInnerU, mag);

    // Map direction x from [-1..1] to [0..1] for red channel.
    const r = dir.x.mul(0.5).add(0.5);

    // Map direction y from [-1..1] to [0..1] for green channel.
    const g = dir.y.mul(0.5).add(0.5);

    // Animate blue over time; blueU acts as a phase offset control.
    const b = sin(time.add(blueU)).mul(0.5).add(0.5);

    // Construct base color from direction (a common debugging visualization in graphics).
    const baseColor = vec3(r, g, b);

    // Create a subtle magnitude-based contrast factor (kept small so direction dominates).
    const contrast = clamp(mag.mul(contrastScaleU), 0.0, 1.0);

    // Blend edges to white (vignette low) and keep center as baseColor (vignette high).
    const white = vec3(1.0, 1.0, 1.0);
    const invVignette = float(1.0).sub(vignette);
    const rawFieldColor = white.mul(invVignette)
    .add(baseColor.mul(vignette))
    .add(contrast.mul(contrastLiftU));
    const fieldColor = white.mul(float(1.0).sub(fieldColorOpacityU))
    .add(rawFieldColor.mul(fieldColorOpacityU));


    // Overlay a single thin rotating vector line anchored at the center.
    const rayDir = vec2(c, s.negate());
    const proj = p.x.mul(rayDir.x).add(p.y.mul(rayDir.y));
    const clampedProj = clamp(proj, 0.0, lineLengthU);
    const closest = rayDir.mul(clampedProj);
    const distToLine = length(p.sub(closest));
    const soft = float(0.0003);
    const lineMask = float(1.0)
      .sub(smoothstep(lineThicknessU, lineThicknessU.add(soft), distToLine))
      .mul(lineOpacityU)
      .mul(vignette);
    const lineColor = vec3(0.0, 0.0, 0.0);
    const color = fieldColor.mul(float(1.0).sub(lineMask)).add(lineColor.mul(lineMask));

    // Draw a sphere marker at the ray tip (instead of screen center).
    const tip = rayDir.mul(lineLengthU);
    const distToTip = length(p.sub(tip));
    const edge = 0.003;
    const tipSphereMask = float(1.0).sub(smoothstep(radiusU, radiusU.add(edge), distToTip));

    // new center sphere
    const distToCenter = length(p);
    const centerSphereMask = float(1.0).sub(smoothstep(radiusU, radiusU.add(edge), distToCenter));

    // combine both spheres (clamp to [0,1])
    const sphereMask = clamp(tipSphereMask.add(centerSphereMask), 0.0, 1.0);

    // blend as before
    const sphereColor = vec3(0.0, 0.0, 0.0);
    const colorWithSphere = color.mul(float(1.0).sub(sphereMask)).add(sphereColor.mul(sphereMask));

    // Opposite ray direction (backward from center)
    const oppDir = rayDir.negate();

    // Finite segment [0 -> oppDir * lineLengthU]
    const oppProj = p.x.mul(oppDir.x).add(p.y.mul(oppDir.y));
    const oppClampedProj = clamp(oppProj, 0.0, lineLengthU);
    const oppClosest = oppDir.mul(oppClampedProj);
    const oppDistToLine = length(p.sub(oppClosest));

    // Base line mask (same thickness softness as main line)
    const oppBaseMask = float(1.0)
      .sub(smoothstep(lineThicknessU, lineThicknessU.add(soft), oppDistToLine));

    // Dash pattern along the segment (0..lineLengthU), repeated by dashCount
    const dashCount = lineLengthU.div(0.025);
    const dashDuty = float(0.5); // 0.5 = equal dash/gap
    const dashPhase = oppClampedProj.div(lineLengthU).mul(dashCount);
    const dashMask = step(fract(dashPhase), dashDuty);

    // Final dashed opposite-line mask
    const oppLineMask = oppBaseMask
      .mul(dashMask)
      .mul(lineOpacityU)
      .mul(vignette);

    // Blend (example dashed gray)
    const oppLineColor = vec3(0.0);
    const colorWithOppDash = colorWithSphere
      .mul(float(1.0).sub(oppLineMask))
      .add(oppLineColor.mul(oppLineMask));

    material.colorNode = colorWithOppDash;

    const resize = () => {
      // If host div disappeared (rare in React transitions), do nothing.
      if (!canvasRef.current) return;
      // Read current container width.
      const w = canvasRef.current.clientWidth;
      // Read current container height.
      const h = canvasRef.current.clientHeight;
      // Avoid invalid camera aspect during transient zero-height layouts.
      if (h === 0) return;
      // Apply size to renderer (updates screenSize node internally).
      renderer.setSize(w, h);
      // Keep perspective projection correct after layout changes.
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    // Use ResizeObserver to react to layout changes (not just window resize).
    const ro = new ResizeObserver(resize);

    // Observe the host div (calls resize when it changes).
    ro.observe(canvasRef.current);

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    return () => {
      // Stop rendering frames.
      renderer.setAnimationLoop(null);
      // Stop observing size changes.
      ro.disconnect();
      // Dispose geometry GPU buffers.
      geometry.dispose();
      // Dispose material GPU programs/resources.
      material.dispose();
      // Dispose renderer resources.
      renderer.dispose();
      // Remove inspector panel if still attached.
      const panel = inspector.domElement;
      if (panel?.parentNode) panel.parentNode.removeChild(panel);
    };
  }, []);

  return (
    <section className="w-screen h-screen overflow-hidden">
        <canvas className="w-full h-full" ref={canvasRef}></canvas>
    </section>
  );
}
