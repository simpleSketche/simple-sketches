"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// WebGPU renderer (Three.js)
import { WebGPURenderer, PMREMGenerator } from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshStandardNodeMaterial } from "three/webgpu";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Inspector } from "three/addons/inspector/Inspector.js";

// TSL / Nodes
import {
  positionLocal,
  normalLocal,
  sin,
  cos,
  length,
  vec2,
  vec3,
  vec4,
  add,
  mul,
  sub,
  div,
  negate,
  normalize,
  max,
  uniform,
  time,
  fract,
  min,
  sqrt,
  smoothstep,
  mix,
} from "three/tsl";

export default function ScalarMultiplyDisplacement() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const params = {
    pScale: 1.0,
    nMul: 1.0,
    k: 0.3,
    frequency: 10.0,
    speed: 3.0,
    transparent: 1.0,
  };

  // Which formula letters are currently highlighted red
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [highlightedValue, setHighlightedValue] = useState<number | null>(params.pScale);

  useEffect(() => {
    if (!containerRef.current) return;
    let disposed = false;
    let envTarget: THREE.RenderTarget | null = null;

    const handleMouseUp = () => setHighlighted(null);
    document.addEventListener("mouseup", handleMouseUp);

    // --- Scene ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.2, 4.5);

    // --- Renderer (WebGPU) ---
    const renderer = new WebGPURenderer({ antialias: true, requiredLimits: { maxStorageBuffersInVertexStage: 1 } });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // --- Inspector ---
    const inspector = new Inspector();
    renderer.inspector = inspector;

    // --- Controls ---
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    // --- Lights ---
    const hemi = new THREE.HemisphereLight(0xffffff, 0xd9e0ea, 0.4);
    scene.add(hemi);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(4, 6, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 20;
    dirLight.shadow.camera.left = -4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = -4;
    scene.add(dirLight);

    // --- Geometry (subdivided plane for displacement) ---
    const geo = new THREE.PlaneGeometry(4, 4, 200, 200);
    geo.rotateX(-Math.PI / 2);

    // --- TSL uniforms — one per formula variable ---
    // p: controlled via mesh.scale (scales the base position vectors)
    // n: nMul scales how much the normal direction contributes
    // k: constant scalar multiplier
    // ripple: frequency + speed
    const nMulU = uniform(1.0);
    const kU = uniform(0.3);
    const frequencyU = uniform(10.0);
    const speedU = uniform(3.0);
    const transparentU = uniform(1.0);

    // --- Inspector controls ---

    const iControls = inspector.createParameters("ScalarMultiplication");

    iControls
      .add(params, "pScale", 0.25, 2.0, 0.01)
      .name("p  — mesh scale")
      .onChange((v: number) => {
        mesh.scale.setScalar(v);
        setHighlighted("p");
        setHighlightedValue(v);
      });

    iControls
      .add(params, "nMul", 0.0, 3.0, 0.01)
      .name("n  — normal multiplier")
      .onChange((v: number) => {
        nMulU.value = v;
        setHighlighted("n");
        setHighlightedValue(v);
      });

    iControls
      .add(params, "k", 0.0, 1.0, 0.01)
      .name("k  — scalar multiplier")
      .onChange((v: number) => {
        kU.value = v;
        setHighlighted("k");
        setHighlightedValue(v);
      });

    iControls
      .add(params, "frequency", 1.0, 30.0, 0.5)
      .name("ripple — frequency")
      .onChange((v: number) => {
        frequencyU.value = v;
        setHighlighted("ripple");
        setHighlightedValue(v);
      });
    
    iControls
      .add(params, "transparent", 0.0, 1.0, 0.01)
      .name("transparent — transparency")
      .onChange((v: number) => {
        transparentU.value = v;
        setHighlighted("transparent");
        setHighlightedValue(v);
      });

    // --- TSL Material ---
    const mat = new MeshStandardNodeMaterial({ color: "#f00", transparent: true });

    // ======= Chapter 5.6: Scalar multiplication in vertex shader =======
    // p' = p + n * (k * ripple)

    const t = time;
    const p = positionLocal;
    const n = normalLocal;

    const xz = vec2(p.x, p.z);
    const d = length(xz); // distance from world center 0,0,0

    const phase = sub(mul(d, frequencyU), mul(t, speedU)); // phase of the ripple (used for the normal calculation) in the direction of the x and z axes (used for the normal calculation)
    const ripple = sin(phase); // ripple value (sin of the phase) in the direction of the x and z axes (used for the normal calculation)

    const k = kU; // scalar multiplier (used for the normal calculation)

    const scalar = mul(k, ripple); // scalar multiplier * ripple (used for the normal calculation)

    // p' = p + n * nMul * (k * ripple)
    const displaced = add(p, mul(n, mul(nMulU, scalar))); // displaced position (used for the normal calculation)
    mat.positionNode = displaced;

    // Analytically computed surface normal for the displaced height field.
    // y = nMul * k * sin(d * frequency - t * speed)
    // ∂y/∂x = nMul * k * cos(phase) * frequency * (x / d)
    // ∂y/∂z = nMul * k * cos(phase) * frequency * (z / d)
    // Surface normal (unnormalized) = (-∂y/∂x, 1, -∂y/∂z)
    const safeD = max(d, 0.001); // clamp to avoid division by zero at center
    const cosPhase = cos(phase); // cosine of the phase of the ripple (used for the normal calculation) in the direction of the x and z axes (used for the normal calculation)
    const dfdx = mul(nMulU, mul(k, mul(cosPhase, mul(frequencyU, div(p.x, safeD))))); // partial derivative of y with respect to x
    const dfdz = mul(nMulU, mul(k, mul(cosPhase, mul(frequencyU, div(p.z, safeD))))); // partial derivative of y with respect to z
    mat.normalNode = normalize(vec3(negate(dfdx), 1, negate(dfdz)));

    mat.opacityNode = transparentU;

    // --- 10×10 dot grid drawn in the fragment shader ---
    // positionLocal.xz in the fragment stage is the interpolated PRE-displacement XZ,
    // which is exactly the regular grid layout we want to measure against.
    // spacing = 4 / (10 - 1) = 4/9 world units per cell
    const dotSpacing = div(2.0, 2.0);

    // Fractional position within cell [0, 1)
    const cellFracX = fract(div(add(p.x, 2.0), dotSpacing));
    const cellFracZ = fract(div(add(p.z, 2.0), dotSpacing));

    // Distance to nearest grid line in each axis, in cell-space [0, 0.5]
    const dcx = min(cellFracX, sub(1.0, cellFracX));
    const dcz = min(cellFracZ, sub(1.0, cellFracZ));

    // Circular distance from nearest grid point (cell-space, max = ~0.707)
    const cellDist = sqrt(add(mul(dcx, dcx), mul(dcz, dcz)));

    // Smooth circular mask: 1 inside dot, 0 outside
    const dotMask = sub(1.0, smoothstep(0.18, 0.19, cellDist));

    mat.colorNode = mix(vec4(1, 0, 0, 0), vec4(0, 0, 0, 1), dotMask);

    mat.envMapIntensity = 0.65;
    mat.roughness = 0.35;
    mat.metalness = 0.05;

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const setupLighting = async () => {
      await renderer.init();
      if (disposed) return;

      const pmremGenerator = new PMREMGenerator(renderer);
      const roomEnvironment = new RoomEnvironment();
      envTarget = pmremGenerator.fromScene(roomEnvironment, 0.04);
      scene.environment = envTarget.texture;
      roomEnvironment.dispose();
      pmremGenerator.dispose();

      renderer.setAnimationLoop(() => {
        orbitControls.update();
        renderer.render(scene, camera);
      });
    };
    void setupLighting().catch((error) => {
      if (!disposed) console.error("Failed to initialize global illumination", error);
    });

    // --- Resize ---
    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // --- Cleanup ---
    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", onResize);
      scene.environment = null;
      envTarget?.dispose();
      orbitControls.dispose();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      const panel = inspector.domElement;
      if (panel?.parentNode) panel.parentNode.removeChild(panel);

      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Inline style helpers
  const hl = (v: string): React.CSSProperties =>
    highlighted === v
      ? { color: "#e00", transition: "color 0.08s", fontSize: 18 }
      : { color: "inherit", transition: "color 0.6s", fontSize: 14 };

  const hlValue = (v: string): React.CSSProperties =>
    highlighted === v
      ? { color: "#e00", transition: "color 0.08s", fontSize: 12 }
      : { color: "white", visibility: "hidden", transition: "color 0.6s", fontSize: 14 };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", borderRadius: 12 }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Formula overlay */}
      <div
        className="absolute bottom-35 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-8px border-radius-10px p-10px font-mono font-bold pointer-events-none user-select-none whitespace-nowrap"
      >
        <span style={{ color: "#888" }}>p</span>
        <span style={{ color: "#888" }}>&apos; = </span>
        <span style={hl("p")}>p</span>
        <span style={{ color: "#888" }}> + </span>
        <span style={hl("n")}>n</span>
        <span style={{ color: "#888" }}> × (</span>
        <span style={hl("k")}>k</span>
        <span style={{ color: "#888" }}> × </span>
        <span style={hl("ripple")}>ripple</span>
        <span style={{ color: "#888" }}>)</span>
      </div>
      <div
        className="absolute bottom-25 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-8px border-radius-10px p-10px font-mono font-bold pointer-events-none user-select-none whitespace-nowrap"
      >
        <span style={{ color: "#888", visibility: "hidden" }}>p</span>
        <span style={{ color: "#888", visibility: "hidden" }}>&apos; = </span>
        <span style={hlValue("p")}>{highlightedValue}</span>
        <span style={{ color: "#888", visibility: "hidden" }}> + </span>
        <span style={hlValue("n")}>{highlightedValue}</span>
        <span style={{ color: "#888", visibility: "hidden" }}> × (</span>
        <span style={hlValue("k")}>{highlightedValue}</span>
        <span style={{ color: "#888", visibility: "hidden" }}> × </span>
        <span style={hlValue("ripple")}>{highlightedValue}</span>
        <span style={{ color: "#888", visibility: "hidden" }}>)</span>
      </div>
    </div>
  );
}
