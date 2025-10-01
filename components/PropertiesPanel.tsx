'use client';

import { useDesignStore } from '@/lib/store';
import type { TextElement } from '@/lib/store';

const FONTS = [
  'Geist, sans-serif',
  'Arial, sans-serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Georgia, serif',
  'Helvetica, sans-serif',
];

const FONT_SIZES = [12, 16, 24, 32, 48, 64, 72, 96, 128];

export function PropertiesPanel() {
  const { elements, selectedElementId, updateElement } = useDesignStore();

  const selectedElement = elements.find((el) => el.id === selectedElementId);

  if (!selectedElement) {
    return null;
  }

  const isText = selectedElement.type === 'text';
  const textElement = selectedElement as TextElement;

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-[#e5e5e5] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="text-xs tracking-widest uppercase font-light">
            PROPERTIES
          </div>

          {isText && (
            <>
              {/* Font Family */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] tracking-wider text-gray-400">FONT</label>
                <select
                  value={textElement.fontFamily}
                  onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
                  className="text-xs border border-[#e5e5e5] px-2 py-1 bg-white hover:bg-[#fafafa]"
                >
                  {FONTS.map((font) => (
                    <option key={font} value={font}>
                      {font.split(',')[0]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] tracking-wider text-gray-400">SIZE</label>
                <select
                  value={textElement.fontSize}
                  onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
                  className="text-xs border border-[#e5e5e5] px-2 py-1 bg-white hover:bg-[#fafafa]"
                >
                  {FONT_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Weight */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] tracking-wider text-gray-400">WEIGHT</label>
                <select
                  value={textElement.fontWeight}
                  onChange={(e) => updateElement(selectedElement.id, { fontWeight: e.target.value })}
                  className="text-xs border border-[#e5e5e5] px-2 py-1 bg-white hover:bg-[#fafafa]"
                >
                  <option value="300">LIGHT</option>
                  <option value="400">REGULAR</option>
                  <option value="500">MEDIUM</option>
                  <option value="700">BOLD</option>
                </select>
              </div>

              {/* Color */}
              <div className="flex items-center gap-2">
                <label className="text-[10px] tracking-wider text-gray-400">COLOR</label>
                <input
                  type="color"
                  value={textElement.color}
                  onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                  className="w-8 h-8 border border-[#e5e5e5] cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Opacity for all elements */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] tracking-wider text-gray-400">OPACITY</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={selectedElement.opacity}
              onChange={(e) => updateElement(selectedElement.id, { opacity: Number(e.target.value) })}
              className="w-24"
            />
            <span className="text-xs w-8">{Math.round(selectedElement.opacity * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
