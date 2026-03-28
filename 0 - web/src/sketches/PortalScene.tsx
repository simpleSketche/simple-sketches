import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import WebGPU from 'three/examples/jsm/capabilities/WebGPU.js'
import { WebGPURenderer, MeshBasicNodeMaterial } from 'three/webgpu'
import { texture, uv, uniform, min, smoothstep, mix, float, add } from 'three/tsl'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE })

export default function PortalScene() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const controlsRef = useRef<CameraControls | null>(null)
    const activeRef = useRef(false)
    const hoveredRef = useRef(false)


    const [active, setActive] = useState(false)

    useEffect(() => {
        activeRef.current = active
    }, [active])

    useEffect(() => {
        if (!canvasRef.current) return

        const renderer = new WebGPURenderer({
            canvas: canvasRef.current,
            antialias: true
        })

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)

        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        // --- Main Scene ---
        const scene = new THREE.Scene()
        scene.background = new THREE.Color('#ffffff')

        const camera = new THREE.PerspectiveCamera(
            75,
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 5

        const portalCamera = new THREE.PerspectiveCamera(50, 2 / 3, 0.1, 1000)
        portalCamera.position.set(0, 0, 2)
        portalCamera.lookAt(0, 0, -2)
        portalCamera.updateProjectionMatrix()

        const light = new THREE.AmbientLight('#ffffff', 1)
        scene.add(light)

        const card = new THREE.Mesh<THREE.PlaneGeometry, THREE.Material>(
            new THREE.PlaneGeometry(2, 3),
            new THREE.MeshBasicMaterial({ color: 'white' })
        )
        scene.add(card)

        const controls = new CameraControls(camera, canvasRef.current)
        controls.smoothTime = 0.6
        controls.draggingSmoothTime = 0.2
        controlsRef.current = controls

        const clock = new THREE.Clock()

        // --- Portal Scene ---
        const portalScene = new THREE.Scene()
        portalScene.background = new THREE.Color('#000000')

        const portalLight = new THREE.AmbientLight('#ffffff', 0.8)
        portalScene.add(portalLight)

        const portalDirectional = new THREE.DirectionalLight(0xffffff, 5.2)
        portalDirectional.position.set(2, 2, 3)
        portalScene.add(portalDirectional)

        const portalCube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: 'orange' })
        )
        portalCube.position.set(0, 0, -2)
        portalScene.add(portalCube)

        // --- Render Target ---
        const renderTarget = new THREE.WebGLRenderTarget(
            canvasRef.current.clientWidth,
            canvasRef.current.clientHeight
        )

        // -- Reusable hit test helpers --
        const updatePointerFromEvent = (event: MouseEvent) => {
            if (!canvasRef.current) return
        
            const rect = canvasRef.current.getBoundingClientRect()
        
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        }
        
        const updateHoverState = (event: MouseEvent) => {
            if (!canvasRef.current) return
        
            updatePointerFromEvent(event)
            raycaster.setFromCamera(mouse, camera)
        
            const intersects = raycaster.intersectObject(card)
            const isHovered = intersects.length > 0
        
            hoveredRef.current = isHovered
            canvasRef.current.style.cursor = isHovered ? 'pointer' : 'default'
        }

        // Step 8 — TSL portal edge fade
        // 0 = contained preview
        // 1 = more open / immersive
        const portalBlend = uniform(0)

        const portalTextureNode = texture(renderTarget.texture, uv())

        const edgeX = min(uv().x, uv().oneMinus().x)
        const edgeY = min(uv().y, uv().oneMinus().y)
        const edge = min(edgeX, edgeY)

        const edgeFade = smoothstep(0.0, add(0.12, portalBlend.mul(0.18)), edge)
        const finalOpacity = mix(float(1), edgeFade, portalBlend)

        const portalMaterial = new MeshBasicNodeMaterial({
            transparent: true
        })

        portalMaterial.colorNode = portalTextureNode.rgb
        portalMaterial.opacityNode = finalOpacity

        card.material.dispose()
        card.material = portalMaterial

        // --- Animation Loop ---
        renderer.setAnimationLoop(() => {
            const delta = clock.getDelta()
            const t = clock.getElapsedTime()

            portalCamera.lookAt(0, 0, -2)

            controls.update(delta)

            portalCube.rotation.y += 0.01
            portalCube.rotation.x += 0.01

            // Step 8 — animate material openness
            const targetBlend = activeRef.current ? 1 : 0
            portalBlend.value += (targetBlend - portalBlend.value) * 0.08

            // Step 9 — subtly scale the card during entry
            const hoverBoost = hoveredRef.current && !activeRef.current ? 0.03 : 0.0
            const targetScale = activeRef.current ? 1.08 : 1.0 + hoverBoost
            const scaleLerp = 0.08
            card.scale.x += (targetScale - card.scale.x) * scaleLerp
            card.scale.y += (targetScale - card.scale.y) * scaleLerp
            card.scale.z += (1.0 - card.scale.z) * scaleLerp

            // Step 12 — subtle portal camera motion
            const radius = 10
            portalCamera.position.x = Math.cos(t * 0.5) * radius
            portalCamera.position.y = Math.sin(t * 0.8) * 0.05
            portalCamera.position.z = 2
            portalCamera.lookAt(0, 0, -2)

            // 1. Render portal scene into texture
            renderer.setRenderTarget(renderTarget)
            renderer.render(portalScene, portalCamera)

            // 2. Render outer scene
            renderer.setRenderTarget(null)
            renderer.render(scene, camera)
        })

        const onClick = (event: MouseEvent) => {
            if (!canvasRef.current) return
        
            updatePointerFromEvent(event)
            raycaster.setFromCamera(mouse, camera)
        
            const intersects = raycaster.intersectObject(card)
            if (intersects.length > 0) {
                setActive((prev) => (prev ? prev : true))
            }
        }

        window.addEventListener('dblclick', onClick)
        window.addEventListener('mousemove', updateHoverState)

        const onResize = () => {
            if (!canvasRef.current) return

            const w = canvasRef.current.clientWidth
            const h = canvasRef.current.clientHeight

            camera.aspect = w / h
            camera.updateProjectionMatrix()

            // keep portal framing independent from main camera
            portalCamera.aspect = 2 / 3
            portalCamera.updateProjectionMatrix()

            renderer.setSize(w, h)
            renderTarget.setSize(w, h)
        }

        window.addEventListener('resize', onResize)

        return () => {
            renderer.setAnimationLoop(null)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('dblclick', onClick)
            window.removeEventListener('mousemove', updateHoverState)

            if(canvasRef.current) {
                canvasRef.current.style.cursor = 'default'
            }

            card.geometry.dispose()
            card.material.dispose()
            portalCube.geometry.dispose()
            portalCube.material.dispose()
            renderTarget.dispose()
            controls.dispose()
            renderer.dispose()
        }
    }, [])

    useEffect(() => {
        const curControls = controlsRef.current
        if (!curControls) return

        if (active) {
            curControls.setLookAt(
                0, 0, 1.2,
                0, 0, -2,
                true
            )
        } else {
            curControls.setLookAt(
                0, 0, 5,
                0, 0, 0,
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
    )
}