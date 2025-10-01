'use client';

import { useDesignStore } from '@/lib/store';
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
} from 'lucide-react';

export function LayersPanel() {
  const {
    elements,
    selectedElementId,
    setSelectedElement,
    updateElement,
    removeElement,
    duplicateElement,
    reorderElement,
  } = useDesignStore();

  if (elements.length === 0) {
    return (
      <aside className="w-72 border-l border-[#e5e5e5] flex flex-col">
        <div className="p-6 border-b border-[#e5e5e5]">
          <h2 className="text-xs tracking-widest uppercase font-light">LAYERS</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-gray-400 tracking-wide">NO LAYERS</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 border-l border-[#e5e5e5] flex flex-col">
      <div className="p-6 border-b border-[#e5e5e5]">
        <h2 className="text-xs tracking-widest uppercase font-light">LAYERS</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {elements.map((element) => (
          <div
            key={element.id}
            className={`border-b border-[#e5e5e5] p-4 ${
              selectedElementId === element.id ? 'bg-[#f5f5f5]' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setSelectedElement(element.id)}
                className="flex-1 text-left text-xs tracking-wide truncate"
              >
                {element.type === 'text' ? element.content : 'Image'}
              </button>

              <button
                onClick={() => updateElement(element.id, { visible: !element.visible })}
                className="p-1 hover:bg-white transition-colors"
                title={element.visible ? 'Hide' : 'Show'}
              >
                {element.visible ? <Eye size={14} strokeWidth={1.5} /> : <EyeOff size={14} strokeWidth={1.5} />}
              </button>

              <button
                onClick={() => updateElement(element.id, { locked: !element.locked })}
                className="p-1 hover:bg-white transition-colors"
                title={element.locked ? 'Unlock' : 'Lock'}
              >
                {element.locked ? <Lock size={14} strokeWidth={1.5} /> : <Unlock size={14} strokeWidth={1.5} />}
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => reorderElement(element.id, 'top')}
                className="p-1 hover:bg-white transition-colors"
                title="Bring to Front"
              >
                <ChevronsUp size={12} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => reorderElement(element.id, 'up')}
                className="p-1 hover:bg-white transition-colors"
                title="Bring Forward"
              >
                <ChevronUp size={12} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => reorderElement(element.id, 'down')}
                className="p-1 hover:bg-white transition-colors"
                title="Send Backward"
              >
                <ChevronDown size={12} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => reorderElement(element.id, 'bottom')}
                className="p-1 hover:bg-white transition-colors"
                title="Send to Back"
              >
                <ChevronsDown size={12} strokeWidth={1.5} />
              </button>

              <div className="flex-1" />

              <button
                onClick={() => duplicateElement(element.id)}
                className="p-1 hover:bg-white transition-colors"
                title="Duplicate"
              >
                <Copy size={12} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => removeElement(element.id)}
                className="p-1 hover:bg-white transition-colors"
                title="Delete"
              >
                <Trash2 size={12} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
