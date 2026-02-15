import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Cube } from './Cube';
import { MenuItem } from '../types';

interface SceneProps {
  items: MenuItem[];
  hoveredId: number | null;
}

export const Scene: React.FC<SceneProps> = ({ items, hoveredId }) => {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 50],
          zoom: 100, 
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#000000']} />

        {/* Minimal lighting needed since lines are unlit, but helps any standard materials */}
        <ambientLight intensity={0.5} />

        {/* Scene Content */}
        <group position={[0, 0, 0]}>
          <Cube items={items} hoveredId={hoveredId} />
        </group>

        {/* Post Processing - Bloom for the neon glow */}
        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            intensity={1.0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};