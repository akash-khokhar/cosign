'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { useDesignStore } from '@/lib/store';

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} scale={1.5} />;
}

function Scene({ modelPath }: { modelPath: string }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
        <Environment preset="studio" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export function ProductViewer() {
  const { selectedProduct } = useDesignStore();

  if (!selectedProduct) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#fafafa]">
        <p className="text-xs text-gray-400 tracking-widest uppercase">3D PREVIEW</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#fafafa]">
      <Canvas>
        <Scene modelPath={selectedProduct.modelPath} />
      </Canvas>
    </div>
  );
}
