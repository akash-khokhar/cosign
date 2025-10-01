'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { ProductViewer } from './ProductViewer';
import { LayersPanel } from './LayersPanel';
import { PropertiesPanel } from './PropertiesPanel';
import { useKeyboardShortcuts } from '@/lib/useKeyboardShortcuts';

export function DesignStudio() {
  useKeyboardShortcuts();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-white">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Product Selection */}
        <Sidebar />

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col relative">
          <Toolbar />

          <div className="flex-1 flex overflow-hidden">
            {/* 2D Design Canvas */}
            <div className="flex-1 relative">
              <Canvas />
              <PropertiesPanel />
            </div>

            {/* 3D Product Viewer */}
            <div className="w-[40%] border-l border-[#e5e5e5]">
              <ProductViewer />
            </div>
          </div>
        </main>

        {/* Right Panel - Layers */}
        <LayersPanel />
      </div>
    </div>
  );
}
