# COSIGN Design Studio

A minimalist, Celine-inspired custom apparel design tool built with Next.js, Three.js, and Fabric.js.

## Features

- **3D Product Viewer** - Real-time 3D preview with GLB/GLTF model support
- **Design Canvas** - Intuitive 2D design interface with drag, resize, and rotate
- **Image Upload** - Upload and manipulate custom images
- **Text Editor** - Add custom text with full typography controls
- **Layer Management** - Organize and control design elements
- **Properties Panel** - Fine-tune fonts, colors, sizes, and opacity
- **Keyboard Shortcuts** - Efficient workflow with shortcuts
- **Export** - Save designs as PNG or JSON

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **3D Rendering**: Three.js + React Three Fiber
- **2D Canvas**: Fabric.js
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Keyboard Shortcuts

- `Delete` / `Backspace` - Delete selected element
- `Cmd/Ctrl + D` - Duplicate selected element
- `Cmd/Ctrl + Z` - Undo
- `Cmd/Ctrl + Shift + Z` - Redo
- `Escape` - Deselect

## Project Structure

```
app/           - Next.js app directory
components/    - React components
lib/           - Utilities and state management
public/        - Static assets
```

## Design Philosophy

Inspired by Celine's minimalist aesthetic:
- Clean typography
- Generous white space
- Subtle interactions
- Monochromatic palette
- Focused user experience

## License

MIT
