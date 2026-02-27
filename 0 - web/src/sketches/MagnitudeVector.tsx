"use client";

import { WebGPURenderer, MeshBasicNodeMaterial } from "three/webgpu";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Inspector } from "three/addons/inspector/Inspector.js";
import ScribbleFrame from "@/components/ScribbleFrame";

import {
  abs,
  atan2,
  clamp,
  cos,
  exp,
  float,
  fract,
  length,
  mix,
  pow,
  screenSize,
  sin,
  smoothstep,
  time,
  uniform,
  vec2,
  vec3,
  viewportUV,
} from "three/tsl";

export default function MagnitudeVector() {
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

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new MeshBasicNodeMaterial({ color: "#000" });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const params = {
      density: 18.0,
      thickness: 0.06,
      warp: 0.12,
      falloff: 1.85,
      r0: 0.38,
      width: 0.12,
      chromatic: 0.45,
      numPeaks: 6,
    };

    const densityU = uniform(params.density);
    const thicknessU = uniform(params.thickness);
    const warpU = uniform(params.warp);
    const falloffU = uniform(params.falloff);
    const r0U = uniform(params.r0);
    const widthU = uniform(params.width);
    const chromaticU = uniform(params.chromatic);
    const numPeaksU = uniform(params.numPeaks);

    const controls = inspector.createParameters("MagnitudeVector");
    controls.add(params, "density", 4.0, 42.0, 0.1).onChange((value) => {
      densityU.value = value;
    });
    controls.add(params, "thickness", 0.01, 0.2, 0.001).onChange((value) => {
      thicknessU.value = value;
    });
    controls.add(params, "warp", 0.0, 0.4, 0.001).onChange((value) => {
      warpU.value = value;
    });
    controls.add(params, "falloff", 0.3, 4.0, 0.01).onChange((value) => {
      falloffU.value = value;
    });
    controls.add(params, "r0", 0.0, 1.2, 0.001).onChange((value) => {
      r0U.value = value;
    });
    controls.add(params, "width", 0.02, 0.35, 0.001).onChange((value) => {
      widthU.value = value;
    });
    controls.add(params, "chromatic", 0.0, 1.0, 0.001).onChange((value) => {
      chromaticU.value = value;
    });
    controls.add(params, "numPeaks", 1, 10, 1).onChange((value) => {
      numPeaksU.value = value;
    });

    // Normalized screen UV and aspect correction to keep circles circular.
    const uv = viewportUV;
    const aspect = screenSize.x.div(screenSize.y);

    // Slowly moving lens center to create breathing motion.
    const center = vec2(
      sin(time.mul(0.17)).mul(0.18).add(0.5),
      cos(time.mul(0.13)).mul(0.12).add(0.5),
    );

    // Position relative to moving center (aspect-corrected coordinate space).
    const p = vec2(uv.x.sub(center.x).mul(aspect), uv.y.sub(center.y));

    // Magnitude field backbone (distance from center).
    const r = length(p);
    
    // Angular coordinate used only for directional warp personality.
    const a = atan2(p.y, p.x);

    // Height function: magnitude plus angular wave warp.
    const h = r.add(warpU.mul(sin(a.mul(numPeaksU).add(time.mul(0.65)))));

    // Topographic contour bands from periodic fractional distance.
    const bands = abs(fract(h.mul(densityU)).sub(0.5));
    // Minor contour line mask with controllable thickness.
    const line = float(1.0).sub(smoothstep(thicknessU, thicknessU.add(0.03), bands));

    // Major contour cadence every N minor rings (N = 5).
    const majorBands = abs(fract(h.mul(densityU).div(5.0)).sub(0.5));

    // Sharper/stonger line mask for major contours.
    const major = float(1.0).sub(smoothstep(thicknessU.mul(0.55), thicknessU.mul(0.55).add(0.02), majorBands));

    // Core fog-like glow that decays with radius.
    const glow = exp(r.mul(falloffU).negate());

    // Donut highlight (gaussian ring) centered at r0 with width control.
    const halo = exp(pow(r.sub(r0U).div(widthU), float(2.0)).negate());

    // Chromatic lens shear strength increases with radial distance.
    const shear = chromaticU.mul(r).mul(8.0);
    // Channel-separated wave phases create subtle prism drift.
    const redWave = sin(h.mul(24.0).add(shear).sub(time.mul(0.7))).mul(0.5).add(0.5);
    const greenWave = sin(h.mul(24.0).add(time.mul(0.45))).mul(0.5).add(0.5);
    const blueWave = sin(h.mul(24.0).sub(shear).add(time.mul(0.62))).mul(0.5).add(0.5);

    // Aurora palette assembled from phase-shifted RGB waves.
    const aurora = vec3(redWave, greenWave, blueWave);

    // Base field layers: deep backdrop + aurora + central glow + halo ring.
    const deep = vec3(0.03, 0.05, 0.08);
    const glowTint = vec3(0.22, 0.68, 0.95).mul(glow.mul(0.9));
    const haloTint = vec3(0.85, 0.95, 1.0).mul(halo.mul(0.42));
    const field = deep.add(aurora.mul(0.35)).add(glowTint).add(haloTint);

    // Contour ink color shifts brighter near the glowing center.
    const contourInk = mix(vec3(0.12, 0.16, 0.2), vec3(0.78, 0.88, 0.98), glow);
    
    // Composite minor contour lines into the field.
    const withMinor = field.mul(float(1.0).sub(line.mul(0.45))).add(contourInk.mul(line.mul(0.45)));

    // Overlay major contour lines for topographic hierarchy.
    const withMajor = withMinor
      .mul(float(1.0).sub(major.mul(0.8)))
      .add(vec3(0.97, 0.99, 1.0).mul(major.mul(0.8)));

    // Soft outer fog to push edges back and keep focus toward the lens.
    const fog = smoothstep(0.35, 1.35, r);
    const bg = vec3(0.02, 0.03, 0.05);

    // Final composite: lens field fades into dark background with distance.
    const finalColor = mix(withMajor, bg, clamp(fog, 0.0, 1.0));

    material.colorNode = finalColor;

    const resize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      if (h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvasRef.current);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      const panel = inspector.domElement;
      if (panel?.parentNode) panel.parentNode.removeChild(panel);
    };
  }, []);

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <canvas className="h-full w-full" ref={canvasRef} />
      <ScribbleFrame />
    </section>
  );
}
