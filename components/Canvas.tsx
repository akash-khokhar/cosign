'use client';

import { useDesignStore } from '@/lib/store';
import { useCanvas } from '@/lib/useCanvas';

export function Canvas() {
  const { selectedProduct } = useDesignStore();
  const { canvasRef } = useCanvas();

  if (!selectedProduct) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-xs text-gray-400 tracking-widest uppercase">SELECT A PRODUCT</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#fafafa]">
      <div className="relative bg-white shadow-sm">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export { useCanvas };
