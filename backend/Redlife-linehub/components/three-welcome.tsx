"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface ThreeWelcomeProps {
  userName: string
  userType: "donor" | "doctor" | "hospital" | "blood-centre"
}

export function ThreeWelcome({ userName, userType }: ThreeWelcomeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const animationFrameId = useRef<number>()
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cleanupRef = useRef<() => void>()

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth > 768, // Only enable antialiasing on desktop
      powerPreference: "high-performance",
    })
    rendererRef.current = renderer

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Limit pixel ratio for performance
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const colorSchemes = {
      donor: {
        primary: 0xdc2626,
        secondary: 0xff4444,
        accent: 0xff6b6b,
        glow: 0xff0000,
      },
      doctor: {
        primary: 0x0ea5e9,
        secondary: 0x38bdf8,
        accent: 0x60a5fa,
        glow: 0x00d4ff,
      },
      hospital: {
        primary: 0x8b5cf6,
        secondary: 0xa78bfa,
        accent: 0xc084fc,
        glow: 0xb000ff,
      },
      "blood-centre": {
        primary: 0xf97316,
        secondary: 0xfb923c,
        accent: 0xfdba74,
        glow: 0xff8800,
      },
    }

    const colors = colorSchemes[userType]

    const pointLight1 = new THREE.PointLight(colors.primary, 1.5, 40)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(colors.secondary, 1.5, 40)
    pointLight2.position.set(-10, -10, 10)
    scene.add(pointLight2)

    const particleCount = 40
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities: THREE.Vector3[] = []

    for (let i = 0; i < particleCount; i++) {
      const radius = 8 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi) - 5

      velocities.push(
        new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02),
      )
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: colors.primary,
      size: 0.25,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    const droplets: Array<{ mesh: THREE.Mesh; velocity: THREE.Vector3; baseY: number }> = []
    const dropletGeometry = new THREE.SphereGeometry(0.15, 16, 16) // Reduced segments

    for (let i = 0; i < 15; i++) {
      const dropletMaterial = new THREE.MeshPhysicalMaterial({
        color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
        emissive: colors.glow,
        emissiveIntensity: 0.3,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
      })

      const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial)
      const angle = (i / 15) * Math.PI * 2
      const radius = 4 + (i % 3)
      const baseY = Math.sin(angle * 2) * 2

      droplet.position.x = Math.cos(angle) * radius
      droplet.position.y = baseY
      droplet.position.z = -5 + Math.sin(angle * 3)

      droplets.push({
        mesh: droplet,
        velocity: new THREE.Vector3(0, 0, 0),
        baseY,
      })
      scene.add(droplet)
    }

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (context) {
      canvas.width = 1024 // Reduced from 2048
      canvas.height = 256 // Reduced from 512

      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `#${colors.primary.toString(16).padStart(6, "0")}`)
      gradient.addColorStop(0.5, `#${colors.secondary.toString(16).padStart(6, "0")}`)
      gradient.addColorStop(1, `#${colors.accent.toString(16).padStart(6, "0")}`)

      context.font = "bold 60px Inter, Arial, sans-serif"
      context.textAlign = "center"
      context.textBaseline = "middle"

      context.shadowColor = `#${colors.glow.toString(16).padStart(6, "0")}`
      context.shadowBlur = 30
      context.fillStyle = gradient
      context.fillText(`Welcome, ${userName}!`, canvas.width / 2, canvas.height / 2)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.minFilter = THREE.LinearFilter
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(12, 3, 1)
    sprite.position.z = -5
    scene.add(sprite)

    camera.position.z = 8

    let time = 0
    let intensity = 0
    const animate = () => {
      time += 0.01
      intensity = Math.min(intensity + 0.03, 1)
      animationFrameId.current = requestAnimationFrame(animate)

      camera.position.x = Math.sin(time * 0.3) * 0.3
      camera.position.y = Math.cos(time * 0.3) * 0.2
      camera.lookAt(0, 0, -5)

      const positionsArray = particles.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positionsArray[i3] += velocities[i].x
        positionsArray[i3 + 1] += velocities[i].y
        positionsArray[i3 + 2] += velocities[i].z

        const distance = Math.sqrt(positionsArray[i3] ** 2 + positionsArray[i3 + 1] ** 2 + positionsArray[i3 + 2] ** 2)

        if (distance > 15) {
          const radius = 8
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)
          positionsArray[i3] = radius * Math.sin(phi) * Math.cos(theta)
          positionsArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positionsArray[i3 + 2] = radius * Math.cos(phi) - 5
        }
      }
      particles.attributes.position.needsUpdate = true
      particleSystem.rotation.y = time * 0.1

      droplets.forEach((droplet, i) => {
        const angle = (i / 15) * Math.PI * 2 + time * 0.5
        const radius = 4 + Math.sin(time * 2 + i * 0.5) * 0.5

        droplet.mesh.position.x = Math.cos(angle) * radius
        droplet.mesh.position.y = droplet.baseY + Math.sin(time * 2 + i * 0.3) * 1
        droplet.mesh.position.z = -5 + Math.sin(angle * 2 + time) * 1

        droplet.mesh.rotation.y += 0.02
        droplet.mesh.rotation.x += 0.01
      })

      const textScale = 1 + Math.sin(time * 1.5) * 0.05
      sprite.scale.set(12 * textScale, 3 * textScale, 1)
      sprite.material.opacity = intensity

      pointLight1.position.x = Math.cos(time * 0.7) * 8
      pointLight1.position.y = Math.sin(time * 0.7) * 8
      pointLight2.position.x = Math.cos(time * 0.7 + Math.PI) * 8
      pointLight2.position.y = Math.sin(time * 0.7 + Math.PI) * 8

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 4500)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    cleanupRef.current = () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      if (containerRef.current && rendererRef.current?.domElement) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement)
        } catch (e) {
          console.log("[v0] Canvas already removed")
        }
      }

      // Dispose all geometries and materials
      dropletGeometry.dispose()
      particleMaterial.dispose()
      particles.dispose()
      texture.dispose()
      spriteMaterial.dispose()

      droplets.forEach((d) => {
        if (d.mesh.material instanceof THREE.Material) {
          d.mesh.material.dispose()
        }
      })

      sceneRef.current?.clear()
      rendererRef.current?.dispose()
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [userName, userType])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center transition-all duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
      }}
    />
  )
}
