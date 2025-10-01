import { fabric } from 'fabric';

export function exportCanvasAsImage(canvas: fabric.Canvas | null, format: 'png' | 'jpg' = 'png') {
  if (!canvas) return;

  const dataURL = canvas.toDataURL({
    format,
    quality: 1,
    multiplier: 2, // 2x resolution
  });

  // Download the image
  const link = document.createElement('a');
  link.download = `cosign-design-${Date.now()}.${format}`;
  link.href = dataURL;
  link.click();
}

export function exportCanvasAsSVG(canvas: fabric.Canvas | null) {
  if (!canvas) return;

  const svg = canvas.toSVG();

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.download = `cosign-design-${Date.now()}.svg`;
  link.href = url;
  link.click();

  URL.revokeObjectURL(url);
}

export function saveDesignToJSON(design: any) {
  const json = JSON.stringify(design, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.download = `cosign-design-${Date.now()}.json`;
  link.href = url;
  link.click();

  URL.revokeObjectURL(url);
}
