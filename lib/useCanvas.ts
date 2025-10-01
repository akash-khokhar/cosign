import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useDesignStore } from './store';

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const {
    activeTool,
    addElement,
    updateElement,
    setSelectedElement,
    setActiveTool,
  } = useDesignStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 800,
      backgroundColor: '#ffffff',
    });

    fabricCanvasRef.current = canvas;

    canvas.on('selection:created', (e) => {
      if (e.selected?.[0]) {
        setSelectedElement(e.selected[0].data?.id || null);
      }
    });

    canvas.on('selection:updated', (e) => {
      if (e.selected?.[0]) {
        setSelectedElement(e.selected[0].data?.id || null);
      }
    });

    canvas.on('selection:cleared', () => {
      setSelectedElement(null);
    });

    canvas.on('object:modified', (e) => {
      if (e.target && e.target.data?.id) {
        updateElement(e.target.data.id, {
          position: { x: e.target.left || 0, y: e.target.top || 0 },
          size: {
            width: (e.target.width || 0) * (e.target.scaleX || 1),
            height: (e.target.height || 0) * (e.target.scaleY || 1),
          },
          rotation: e.target.angle || 0,
        });
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  // Handle text tool
  useEffect(() => {
    if (activeTool === 'text' && fabricCanvasRef.current) {
      const text = new fabric.IText('YOUR TEXT', {
        left: 100,
        top: 100,
        fontFamily: 'Geist, sans-serif',
        fontSize: 48,
        fill: '#000000',
        fontWeight: '300',
      });

      const id = `text-${Date.now()}`;
      text.data = { id };

      fabricCanvasRef.current.add(text);
      fabricCanvasRef.current.setActiveObject(text);

      addElement({
        id,
        type: 'text',
        content: 'YOUR TEXT',
        position: { x: 100, y: 100 },
        size: { width: text.width || 200, height: text.height || 50 },
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        zIndex: 0,
        fontFamily: 'Geist, sans-serif',
        fontSize: 48,
        fontWeight: '300',
        color: '#000000',
        textAlign: 'left',
      });

      setActiveTool(null);
    }
  }, [activeTool]);

  const addImage = (imageUrl: string) => {
    if (!fabricCanvasRef.current) return;

    fabric.Image.fromURL(imageUrl, (img) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });

      const id = `image-${Date.now()}`;
      img.data = { id };

      fabricCanvasRef.current?.add(img);
      fabricCanvasRef.current?.setActiveObject(img);
      fabricCanvasRef.current?.renderAll();

      addElement({
        id,
        type: 'image',
        content: imageUrl,
        position: { x: 100, y: 100 },
        size: {
          width: (img.width || 0) * 0.5,
          height: (img.height || 0) * 0.5,
        },
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        zIndex: 0,
      });
    });
  };

  return { canvasRef, fabricCanvas: fabricCanvasRef.current, addImage };
}
