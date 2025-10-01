'use client';

import { useDesignStore } from '@/lib/store';

const PRODUCTS = [
  {
    id: 't-shirt',
    name: 'T-SHIRT',
    category: 'APPAREL',
    modelPath: '/models/tshirt.glb',
    printAreas: [
      { id: 'front', name: 'FRONT', position: 'front', dimensions: { width: 300, height: 400 } },
      { id: 'back', name: 'BACK', position: 'back', dimensions: { width: 300, height: 400 } },
    ],
  },
  {
    id: 'hoodie',
    name: 'HOODIE',
    category: 'APPAREL',
    modelPath: '/models/hoodie.glb',
    printAreas: [
      { id: 'front', name: 'FRONT', position: 'front', dimensions: { width: 300, height: 400 } },
      { id: 'back', name: 'BACK', position: 'back', dimensions: { width: 300, height: 400 } },
    ],
  },
  {
    id: 'sweatshirt',
    name: 'SWEATSHIRT',
    category: 'APPAREL',
    modelPath: '/models/sweatshirt.glb',
    printAreas: [
      { id: 'front', name: 'FRONT', position: 'front', dimensions: { width: 300, height: 400 } },
      { id: 'back', name: 'BACK', position: 'back', dimensions: { width: 300, height: 400 } },
    ],
  },
];

export function Sidebar() {
  const { selectedProduct, setSelectedProduct } = useDesignStore();

  return (
    <aside className="w-60 border-r border-[#e5e5e5] flex flex-col">
      <div className="p-6 border-b border-[#e5e5e5]">
        <h2 className="text-xs tracking-widest uppercase font-light">PRODUCTS</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`w-full text-left px-6 py-4 border-b border-[#e5e5e5] hover:bg-[#f5f5f5] transition-colors ${
              selectedProduct?.id === product.id ? 'bg-[#f5f5f5]' : ''
            }`}
          >
            <div className="text-xs tracking-wide">{product.name}</div>
            <div className="text-[10px] text-gray-400 mt-1 tracking-wider">{product.category}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
