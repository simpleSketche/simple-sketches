import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import WebGPU from 'three/examples/jsm/capabilities/WebGPU.js'
import { WebGPURenderer } from 'three/webgpu'
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });

export default function PortalScene(){

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const controlsRef = useRef<CameraControls | null>(null);

    const [active, setActive] = useState(false);

    useEffect(() => {

        if(!canvasRef.current)return;

        const renderer = new WebGPURenderer({
            canvas: canvasRef.current,
            antialias: true
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // --- Main Scene ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#ffffff")

        const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const light = new THREE.AmbientLight("#ffffff", 1)
        scene.add(light)

        const card = new THREE.Mesh(new THREE.PlaneGeometry(2, 3), new THREE.MeshBasicMaterial({color: "white"}))
        scene.add(card)

        const controls = new CameraControls(camera, canvasRef.current)
        controls.smoothTime = 0.6;
        controls.draggingSmoothTime = 0.2;
        controlsRef.current = controls;

        const clock = new THREE.Clock();

        // --- Portal Scene ---
        const portalScene = new THREE.Scene();
        portalScene.background = new THREE.Color("#000000")

        const portalLight = new THREE.AmbientLight("#ffffff", 0.8)
        portalScene.add(portalLight)

        const portalDirectional = new THREE.DirectionalLight(0xffffff, 5.2)
        portalDirectional.position.set(2, 2, 3)
        portalScene.add(portalDirectional)

        const portalCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: "orange"}))
        portalCube.position.set(0, 0, -2)
        portalScene.add(portalCube)

        // --- Render Target, draw the cube onto a texture ---
        const renderTarget = new THREE.WebGLRenderTarget(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
        card.material.dispose();
        card.material = new THREE.MeshBasicMaterial({map: renderTarget.texture})

        // --- Animation Loop ---
        renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();

            controls.update(delta);

            portalCube.rotation.y += 0.01;
            portalCube.rotation.x += 0.01;

            // 1. Render the portal scene onto the offscreen texture
            renderer.setRenderTarget(renderTarget);
            renderer.render(portalScene, camera);

            // 2. Render the main scene onto the canvas
            renderer.setRenderTarget(null);
            renderer.render(scene, camera);
        });

        const onClick = (event: MouseEvent) => {
            if(!canvasRef.current)return;

            mouse.x = (event.clientX / canvasRef.current.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / canvasRef.current.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(card);
            if(intersects.length > 0){
                setActive((prev) => prev ? prev : true);
            }
        }
        window.addEventListener("dblclick", onClick);

        const onResize = () => {
            if (!canvasRef.current) return;
            const w = canvasRef.current.clientWidth;
            const h = canvasRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderTarget.setSize(w, h);
          };
          window.addEventListener("resize", onResize);

        return () => {
            renderer.setAnimationLoop(null);
            window.removeEventListener("resize", onResize)
            window.removeEventListener("dblclick", onClick);
            card.geometry.dispose();
            card.material.dispose();
            renderer.dispose();
            controls.dispose();
            portalCube.geometry.dispose();
            portalCube.material.dispose();
            renderTarget.dispose();
        }
    }, [])

    useEffect(() => {

        const curControls = controlsRef.current;
        if(!curControls)return;
        if(active){
            curControls.setLookAt(
                0,0,1.2,
                0,0,-2,
                true
            )
        }else{
            curControls.setLookAt(
                0,0,5,
                0,0,0,
                true
            )
        }

    }, [active])

    return (
        <section className="w-screen h-screen overflow-hidden">
        {active && (
            <button
                onClick={() => setActive(false)}
                style={{
                position: 'fixed',
                top: 20,
                right: 20,
                padding: '10px 14px',
                fontSize: '14px',
                zIndex: 10,
                cursor: 'pointer'
                }}
            >
                Back
            </button>
        )}
            <canvas className="w-full h-full" ref={canvasRef}></canvas>
        </section>
      );
}