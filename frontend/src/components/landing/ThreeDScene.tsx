"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment, 
  ContactShadows, 
  MeshDistortMaterial, 
  Preload,
  Bvh
} from "@react-three/drei";
import { useRef, Suspense, memo } from "react";
import * as THREE from "three";

// Memoize individual components to prevent unnecessary re-renders
const GlassOrb = memo(({ position, scale = 1, color = "#3b82f6" }: { position: [number, number, number], scale?: number, color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5} position={position}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color={color}
          speed={2}
          distort={0.4}
          radius={1}
          metalness={0.4}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
});

const FloatingCoin = memo(({ position, rotation, color = "#eab308" }: { position: [number, number, number], rotation: [number, number, number], color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8} position={position}>
      <mesh ref={meshRef} rotation={rotation}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 24]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
});

export default function ThreeDScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-b-2 border-blue-500 animate-spin opacity-20"></div>
        </div>
      }>
        <Canvas 
          camera={{ position: [0, 0, 12], fov: 45 }} 
          gl={{ 
            antialias: false, 
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={[1, 1.5]} // Limit DPR slightly for performance
          shadows={false}
        >
          <Bvh firstHitOnly>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
            
            {/* Left Side: Professional Blue AI Core */}
            <GlassOrb position={[-6, 2, -4]} scale={1.8} color="#3b82f6" />
            <FloatingCoin position={[-5, -2, -2]} rotation={[Math.PI / 4, 0, Math.PI / 6]} color="#60a5fa" />
            
            {/* Right Side: Luxury Purple AI Core */}
            <GlassOrb position={[7, -1, -5]} scale={2.2} color="#a855f7" />
            <FloatingCoin position={[4, 3, -1]} rotation={[Math.PI / 3, Math.PI / 2, 0]} color="#c084fc" />
            
            {/* Center-ish Accents */}
            <FloatingCoin position={[0, -4, -6]} rotation={[0, Math.PI / 4, 0]} color="#eab308" />

            <Environment preset="night" />
            <ContactShadows position={[0, -6, 0]} opacity={0.3} scale={25} blur={2.5} far={8} color="#000000" />
            <Preload all />
          </Bvh>
        </Canvas>
      </Suspense>
    </div>
  );
}


