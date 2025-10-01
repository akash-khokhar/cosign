'use client';

import { useDesignStore } from '@/lib/store';
import { exportCanvasAsImage, saveDesignToJSON } from '@/lib/exportHelpers';

export function Header() {
  const { elements, selectedProduct } = useDesignStore();

  const handleSave = () => {
    const design = {
      product: selectedProduct,
      elements,
      timestamp: new Date().toISOString(),
    };
    saveDesignToJSON(design);
  };

  const handleExport = () => {
    // For now, this will export via canvas
    // In production, you'd get the canvas reference from context
    const canvasElement = document.querySelector('canvas');
    if (canvasElement) {
      const canvas = (canvasElement as any).__fabric;
      if (canvas) {
        exportCanvasAsImage(canvas, 'png');
      }
    }
  };

  return (
    <header className="h-14 border-b border-[#e5e5e5] flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <h1 className="text-sm font-light tracking-widest uppercase">COSIGN</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="text-xs tracking-wide uppercase px-4 py-2 hover:bg-[#f5f5f5] transition-colors"
        >
          SAVE
        </button>
        <button
          onClick={handleExport}
          className="text-xs tracking-wide uppercase px-4 py-2 bg-black text-white hover:bg-[#333] transition-colors"
        >
          EXPORT
        </button>
      </div>
    </header>
  );
}
