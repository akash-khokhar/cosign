import { create } from 'zustand';

export type DesignElement = {
  id: string;
  type: 'image' | 'text';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  zIndex: number;
};

export type TextElement = DesignElement & {
  type: 'text';
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  textAlign: string;
};

export type ImageElement = DesignElement & {
  type: 'image';
};

export type ProductTemplate = {
  id: string;
  name: string;
  category: string;
  modelPath: string;
  printAreas: {
    id: string;
    name: string;
    position: string;
    dimensions: { width: number; height: number };
  }[];
};

type DesignStore = {
  // Product state
  selectedProduct: ProductTemplate | null;
  selectedPrintArea: string | null;

  // Design elements
  elements: (ImageElement | TextElement)[];
  selectedElementId: string | null;

  // Tool state
  activeTool: 'select' | 'text' | 'image' | null;

  // History
  history: any[];
  historyIndex: number;

  // Actions
  setSelectedProduct: (product: ProductTemplate | null) => void;
  setSelectedPrintArea: (areaId: string) => void;
  addElement: (element: ImageElement | TextElement) => void;
  updateElement: (id: string, updates: Partial<DesignElement>) => void;
  removeElement: (id: string) => void;
  setSelectedElement: (id: string | null) => void;
  setActiveTool: (tool: 'select' | 'text' | 'image' | null) => void;
  reorderElement: (id: string, direction: 'up' | 'down' | 'top' | 'bottom') => void;
  duplicateElement: (id: string) => void;
  undo: () => void;
  redo: () => void;
};

export const useDesignStore = create<DesignStore>((set, get) => ({
  selectedProduct: null,
  selectedPrintArea: null,
  elements: [],
  selectedElementId: null,
  activeTool: null,
  history: [],
  historyIndex: -1,

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  setSelectedPrintArea: (areaId) => set({ selectedPrintArea: areaId }),

  addElement: (element) => set((state) => ({
    elements: [...state.elements, element],
    selectedElementId: element.id,
  })),

  updateElement: (id, updates) => set((state) => ({
    elements: state.elements.map((el) =>
      el.id === id ? { ...el, ...updates } : el
    ),
  })),

  removeElement: (id) => set((state) => ({
    elements: state.elements.filter((el) => el.id !== id),
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
  })),

  setSelectedElement: (id) => set({ selectedElementId: id }),

  setActiveTool: (tool) => set({ activeTool: tool }),

  reorderElement: (id, direction) => set((state) => {
    const elements = [...state.elements];
    const index = elements.findIndex((el) => el.id === id);
    if (index === -1) return state;

    const element = elements[index];
    elements.splice(index, 1);

    switch (direction) {
      case 'up':
        elements.splice(Math.min(index + 1, elements.length), 0, element);
        break;
      case 'down':
        elements.splice(Math.max(index - 1, 0), 0, element);
        break;
      case 'top':
        elements.push(element);
        break;
      case 'bottom':
        elements.unshift(element);
        break;
    }

    return { elements };
  }),

  duplicateElement: (id) => set((state) => {
    const element = state.elements.find((el) => el.id === id);
    if (!element) return state;

    const newElement = {
      ...element,
      id: `${Date.now()}`,
      position: {
        x: element.position.x + 20,
        y: element.position.y + 20,
      },
    };

    return {
      elements: [...state.elements, newElement],
      selectedElementId: newElement.id,
    };
  }),

  undo: () => {
    // TODO: Implement undo/redo
  },

  redo: () => {
    // TODO: Implement undo/redo
  },
}));
