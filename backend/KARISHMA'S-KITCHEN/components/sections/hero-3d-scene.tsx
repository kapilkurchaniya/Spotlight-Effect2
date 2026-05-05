"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, Sphere, Box, Torus, Environment } from "@react-three/drei"
import * as THREE from "three"

function FloatingFood({ position, color, shape, speed = 1 }: { 
  position: [number, number, number]
  color: string
  shape: "sphere" | "box" | "torus"
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3
      meshRef.current.rotation.y += 0.01 * speed
    }
  })

  const ShapeComponent = shape === "sphere" ? Sphere : shape === "box" ? Box : Torus

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <ShapeComponent ref={meshRef} position={position} args={shape === "torus" ? [0.3, 0.15, 16, 32] : [0.4, 32, 32]}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </ShapeComponent>
    </Float>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#228B22" transparent opacity={0.6} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#90EE90" />
      
      {/* Floating food representations */}
      {/* Avocado - green sphere */}
      <FloatingFood position={[-2.5, 1, 0]} color="#567d46" shape="sphere" speed={0.8} />
      
      {/* Chicken/Protein - tan box */}
      <FloatingFood position={[2.5, 0.5, -1]} color="#d4a574" shape="box" speed={1.2} />
      
      {/* Quinoa - small cream sphere */}
      <FloatingFood position={[-1.5, -1.5, 1]} color="#f5f5dc" shape="sphere" speed={1} />
      
      {/* Spinach - dark green torus */}
      <FloatingFood position={[1.5, -1, 0.5]} color="#2d5a27" shape="torus" speed={0.9} />
      
      {/* Nuts - brown sphere */}
      <FloatingFood position={[0, 2, -0.5]} color="#8B4513" shape="sphere" speed={1.1} />
      
      {/* Extra healthy elements */}
      <FloatingFood position={[-3, -0.5, -1]} color="#ff6347" shape="sphere" speed={0.7} />
      <FloatingFood position={[3, 1.5, 0.5]} color="#ffd700" shape="box" speed={1.3} />
      
      <Particles />
      
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
