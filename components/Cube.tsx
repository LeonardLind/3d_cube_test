import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { NEON_GREEN } from '../constants';
import { CubeProps } from '../types';

// Isometric angles
const BASE_ROT_X = Math.atan(1 / Math.sqrt(2));
const BASE_ROT_Y = Math.PI / 4;

// Create a soft gradient texture for the glow
const useGlowTexture = () => {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      // Adjusted gradient: Lower alpha at start (0.6) for softer core, faster falloff
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)'); 
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
};

const VertexFlare = ({ position, active }: { position: [number, number, number]; active: boolean }) => {
  const spriteRef = useRef<THREE.Sprite>(null);
  const texture = useGlowTexture();

  useEffect(() => {
    if (spriteRef.current) {
      if (active) {
        // Soft bloom expansion - Reduced scale and opacity for "slight light" feel
        gsap.to(spriteRef.current.scale, {
          x: 0.8, // Increased slightly from 0.5 for better visibility
          y: 0.8,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true, // Prevents animation conflicts
        });
        gsap.to(spriteRef.current.material, {
          opacity: 0.6,
          duration: 0.4,
          overwrite: true,
        });
      } else {
        // Shrink and vanish
        gsap.to(spriteRef.current.scale, {
          x: 0, 
          y: 0,
          duration: 0.3,
          ease: 'power2.in',
          overwrite: true,
        });
        gsap.to(spriteRef.current.material, {
          opacity: 0,
          duration: 0.3,
          overwrite: true,
        });
      }
    }
  }, [active]);

  return (
    <group position={position}>
      <sprite ref={spriteRef} scale={[0, 0, 0]}>
        <spriteMaterial 
          map={texture} 
          transparent 
          opacity={0} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
        />
      </sprite>
    </group>
  );
};

// Internal rotating core to give the cube "guts"
const InnerCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotates continuously on a different axis than the main cube
      meshRef.current.rotation.x -= delta * 0.2;
      meshRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group>
      {/* Wireframe Icosahedron */}
      <Icosahedron args={[0.55, 0]} ref={meshRef}>
        <meshBasicMaterial 
          color={NEON_GREEN} 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Icosahedron>
      
      {/* Solid Ghost Core for glow volume */}
      <Icosahedron args={[0.4, 0]}>
         <meshBasicMaterial 
          color={NEON_GREEN} 
          transparent 
          opacity={0.05} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Icosahedron>
    </group>
  );
};

// Floating data particles inside the cube
const DataParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create random points inside the cube volume
  const particles = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random spread within box, slightly smaller than boundary
      positions[i * 3] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slowly rotate the particle cloud
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={NEON_GREEN}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

// Decorative corner brackets to make the cube look manufactured
const CornerBrackets = ({ items }: { items: CubeProps['items'] }) => {
  return (
    <>
      {items.map((item) => (
        <mesh key={`corner-${item.id}`} position={item.vertexPosition}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.8} />
        </mesh>
      ))}
      {/* Add the missing two corners that aren't in the menu items to complete the look */}
      <mesh position={[1, -1, -1]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.8} />
      </mesh>
      <mesh position={[-1, 1, 1]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.8} />
      </mesh>
    </>
  );
};

// Define the 12 edges of a cube
const BOX_EDGES = [
  // X-axis aligned
  new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, -1, -1),
  new THREE.Vector3(-1, 1, -1), new THREE.Vector3(1, 1, -1),
  new THREE.Vector3(-1, -1, 1), new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(-1, 1, 1), new THREE.Vector3(1, 1, 1),
  // Y-axis aligned
  new THREE.Vector3(-1, -1, -1), new THREE.Vector3(-1, 1, -1),
  new THREE.Vector3(1, -1, -1), new THREE.Vector3(1, 1, -1),
  new THREE.Vector3(-1, -1, 1), new THREE.Vector3(-1, 1, 1),
  new THREE.Vector3(1, -1, 1), new THREE.Vector3(1, 1, 1),
  // Z-axis aligned
  new THREE.Vector3(-1, -1, -1), new THREE.Vector3(-1, -1, 1),
  new THREE.Vector3(1, -1, -1), new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, 1, 1),
  new THREE.Vector3(1, 1, -1), new THREE.Vector3(1, 1, 1),
];

export const Cube: React.FC<CubeProps> = ({ items, hoveredId }) => {
  const cubeRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!cubeRef.current) return;

    // Interactive Parallax
    const targetX = BASE_ROT_X - (pointer.y * 0.2);
    const targetY = BASE_ROT_Y + (pointer.x * 0.2);

    cubeRef.current.rotation.x = THREE.MathUtils.lerp(cubeRef.current.rotation.x, targetX, 0.05);
    cubeRef.current.rotation.y = THREE.MathUtils.lerp(cubeRef.current.rotation.y, targetY, 0.05);
  });

  return (
    // Scaled up cube
    <group ref={cubeRef} rotation={[BASE_ROT_X, BASE_ROT_Y, 0]} scale={[1.6, 1.6, 1.6]}>
      {/* 1. Main Outer Frame */}
      <Line
        points={BOX_EDGES} 
        color={NEON_GREEN}
        lineWidth={3} // Slightly thinner to look elegant with the brackets
        segments
        transparent
        opacity={0.8}
        toneMapped={false}
      />

      {/* 2. Corner "Hardware" Brackets */}
      <CornerBrackets items={items} />

      {/* 3. Inner Rotating Processor Core */}
      <InnerCore />

      {/* 4. Floating Data Cloud */}
      <DataParticles />

      {/* 5. Interactive Flares */}
      {items.map((item) => (
        <VertexFlare
          key={item.id}
          position={item.vertexPosition}
          active={hoveredId === item.id}
        />
      ))}
    </group>
  );
};