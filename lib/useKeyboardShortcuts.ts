import { useEffect } from 'react';
import { useDesignStore } from './store';

export function useKeyboardShortcuts() {
  const {
    selectedElementId,
    removeElement,
    duplicateElement,
    undo,
    redo,
  } = useDesignStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete - Delete selected element
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        e.preventDefault();
        removeElement(selectedElementId);
      }

      // Cmd/Ctrl + D - Duplicate
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && selectedElementId) {
        e.preventDefault();
        duplicateElement(selectedElementId);
      }

      // Cmd/Ctrl + Z - Undo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Cmd/Ctrl + Shift + Z - Redo
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        redo();
      }

      // Escape - Deselect
      if (e.key === 'Escape') {
        e.preventDefault();
        // Canvas handles this
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, removeElement, duplicateElement, undo, redo]);
}
