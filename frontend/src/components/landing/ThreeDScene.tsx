"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlassOrb({ position, scale = 1, color = "#3b82f6" }: { position: [number, number, number], scale?: number, color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.5}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingCoin({ position, rotation, color = "#eab308" }: { position: [number, number, number], rotation: [number, number, number], color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <mesh ref={meshRef} rotation={rotation}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          metalness={1} 
          roughness={0.1} 
          emissive={color}
          emissiveIntensity={0.2}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeDScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 45 }} 
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[10, -10, 10]} intensity={1} color="#3b82f6" />
        
        {/* Left Side: Professional Blue AI Core */}
        <GlassOrb position={[-6, 2, -4]} scale={1.8} color="#3b82f6" />
        <FloatingCoin position={[-5, -2, -2]} rotation={[Math.PI / 4, 0, Math.PI / 6]} color="#60a5fa" />
        
        {/* Right Side: Luxury Purple AI Core */}
        <GlassOrb position={[7, -1, -5]} scale={2.2} color="#a855f7" />
        <FloatingCoin position={[4, 3, -1]} rotation={[Math.PI / 3, Math.PI / 2, 0]} color="#c084fc" />
        
        {/* Center-ish Accents */}
        <FloatingCoin position={[0, -4, -6]} rotation={[0, Math.PI / 4, 0]} color="#eab308" />

        <Environment preset="city" />
        <ContactShadows position={[0, -6, 0]} opacity={0.4} scale={30} blur={2} far={10} color="#000000" />
      </Canvas>
    </div>
  );
}

