import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NEON_GREEN } from '../constants';

const ORB_COUNT = 8;

const PulseOrb = ({ position, baseScale, timeOffset }: { position: [number, number, number], baseScale: number, timeOffset: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + timeOffset;
    
    // Create a breathing effect
    // Scale oscillates slowly
    const scale = baseScale * (1 + Math.sin(t * 0.3) * 0.2);
    meshRef.current.scale.setScalar(scale);
    
    // Opacity pulses (alive feel)
    // Dramatically reduced opacity for "barely noticeable" subtle effect
    // Base 0.005 + slight variation
    const opacity = 0.005 + Math.max(0, Math.sin(t * 0.5 + position[0])) * 0.01;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    
    // Subtle movement
    meshRef.current.position.y = position[1] + Math.sin(t * 0.2) * 1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color={NEON_GREEN} 
        transparent 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
      />
    </mesh>
  );
};

export const BackgroundPulse: React.FC = () => {
  // Generate random positions for the background "clouds"
  const orbs = useMemo(() => {
    return Array.from({ length: ORB_COUNT }).map((_, i) => ({
      // Positioned widely in the background
      position: [
        (Math.random() - 0.5) * 60, // Wide X
        (Math.random() - 0.5) * 40, // Wide Y
        -20 - Math.random() * 30    // Far Z
      ] as [number, number, number],
      baseScale: 5 + Math.random() * 10, // Large blobs
      timeOffset: Math.random() * 100,
    }));
  }, []);

  return (
    <group>
      {orbs.map((orb, i) => (
        <PulseOrb key={i} {...orb} />
      ))}
    </group>
  );
};