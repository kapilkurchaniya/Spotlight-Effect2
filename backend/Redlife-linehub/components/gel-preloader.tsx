"use client"

import { useEffect, useState, useRef } from "react"

export function GelPreloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cleanupRef = useRef<() => void>()

  useEffect(() => {
    if (typeof window === "undefined") return

    let animationFrameId: number
    let scene: any, camera: any, renderer: any, gelBlob: any

    const initThreeJS = async () => {
      const THREE = await import("three")

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: window.innerWidth > 768, // Only on desktop
        alpha: true,
        powerPreference: "high-performance",
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Limited for performance

      const keyLight = new THREE.DirectionalLight(0xffffff, 1)
      keyLight.position.set(5, 5, 5)
      scene.add(keyLight)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const geometry = new THREE.IcosahedronGeometry(1.5, 16) // Reduced from 32 to 16

      const material = new THREE.MeshPhongMaterial({
        color: 0xdc2626,
        emissive: 0x7f1d1d,
        emissiveIntensity: 0.3,
        shininess: 100,
        transparent: true,
        opacity: 0.95,
      })

      gelBlob = new THREE.Mesh(geometry, material)
      scene.add(gelBlob)

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)

        const time = Date.now() * 0.001

        gelBlob.rotation.x = time * 0.15
        gelBlob.rotation.y = time * 0.2

        const scale = 1 + Math.sin(time * 2) * 0.05
        gelBlob.scale.set(scale, scale, scale)

        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener("resize", handleResize)

      cleanupRef.current = () => {
        window.removeEventListener("resize", handleResize)
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
        geometry.dispose()
        material.dispose()
        scene.clear()
        renderer.dispose()
      }
    }

    initThreeJS()

    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1700)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className={`relative z-10 text-center space-y-6 transition-all duration-700 ${
          fadeOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent tracking-tight">
            Red Lifeline Hub Foundation
          </h1>
        </div>

        <p className="text-sm text-red-600 tracking-widest uppercase font-semibold">Saving Lives Together</p>

        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="loading-dot"></div>
          <div className="loading-dot" style={{ animationDelay: "0.2s" }}></div>
          <div className="loading-dot" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      <style jsx>{`
        .loading-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          animation: loading-bounce 1.4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }

        @keyframes loading-bounce {
          0%,
          80%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
