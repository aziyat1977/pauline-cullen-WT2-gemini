import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';

// Fix for missing JSX intrinsic elements in some TS environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
    }
  }
}

const AnimatedSphere = ({ color, speed }: { color: string, speed: number }) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Gentle rotation
    mesh.current.rotation.x = time * 0.1;
    mesh.current.rotation.y = time * 0.15;
  });

  return (
    <Sphere visible args={[1, 100, 200]} scale={2} ref={mesh}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4} // Strength, 0 disables the effect (default=1)
        speed={speed} // Speed (default=1)
        roughness={0.2}
        metalness={0.1}
      />
    </Sphere>
  );
};

const DynamicBackground: React.FC = () => {
  const { userMode } = useStore();
  
  const bgConfig = useMemo(() => {
    switch (userMode) {
      case 'introvert': return { color: '#334155', speed: 1.5 }; // Slate-700ish
      case 'extrovert': return { color: '#f59e0b', speed: 4 }; // Amber
      case 'ambivert': return { color: '#3b82f6', speed: 2.5 }; // Blue
      default: return { color: '#475569', speed: 1 }; // Default
    }
  }, [userMode]);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere color={bgConfig.color} speed={bgConfig.speed} />
      </Canvas>
    </div>
  );
};

export default DynamicBackground;