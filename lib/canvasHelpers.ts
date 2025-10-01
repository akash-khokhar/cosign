import { fabric } from 'fabric';

export function addImageToCanvas(
  canvas: fabric.Canvas,
  imageUrl: string,
  onAdd: (id: string, img: fabric.Image) => void
) {
  fabric.Image.fromURL(imageUrl, (img) => {
    img.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    const id = `image-${Date.now()}`;
    img.data = { id };

    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();

    onAdd(id, img);
  });
}

export function updateCanvasObject(
  canvas: fabric.Canvas,
  id: string,
  updates: any
) {
  const object = canvas.getObjects().find((obj: any) => obj.data?.id === id);
  if (!object) return;

  if (updates.position) {
    object.set({ left: updates.position.x, top: updates.position.y });
  }
  if (updates.visible !== undefined) {
    object.set({ visible: updates.visible });
  }
  if (updates.locked !== undefined) {
    object.set({ selectable: !updates.locked });
  }

  canvas.renderAll();
}
