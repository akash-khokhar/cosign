'use client';

import { useRef } from 'react';
import { useDesignStore } from '@/lib/store';
import { useCanvas } from './Canvas';
import { MousePointer2, Type, Upload } from 'lucide-react';

export function Toolbar() {
  const { activeTool, setActiveTool, selectedProduct } = useDesignStore();
  const { addImage } = useCanvas();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      addImage(imageUrl);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!selectedProduct) {
    return (
      <div className="h-12 border-b border-[#e5e5e5] flex items-center justify-center">
        <p className="text-xs text-gray-400 tracking-wide">SELECT A PRODUCT TO BEGIN</p>
      </div>
    );
  }

  return (
    <div className="h-12 border-b border-[#e5e5e5] flex items-center px-6 gap-1">
      <button
        onClick={() => setActiveTool('select')}
        className={`p-2 hover:bg-[#f5f5f5] transition-colors ${
          activeTool === 'select' ? 'bg-[#f5f5f5]' : ''
        }`}
        title="Select"
      >
        <MousePointer2 size={16} strokeWidth={1.5} />
      </button>

      <button
        onClick={() => setActiveTool('text')}
        className={`p-2 hover:bg-[#f5f5f5] transition-colors ${
          activeTool === 'text' ? 'bg-[#f5f5f5]' : ''
        }`}
        title="Add Text"
      >
        <Type size={16} strokeWidth={1.5} />
      </button>

      <label
        className="p-2 hover:bg-[#f5f5f5] transition-colors cursor-pointer"
        title="Upload Image"
      >
        <Upload size={16} strokeWidth={1.5} />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      <div className="flex-1" />

      {/* Print Area Selector */}
      <div className="flex gap-1">
        {selectedProduct.printAreas.map((area) => (
          <button
            key={area.id}
            className="text-xs px-3 py-1 hover:bg-[#f5f5f5] transition-colors tracking-wide"
          >
            {area.name}
          </button>
        ))}
      </div>
    </div>
  );
}
