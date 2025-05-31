import { writable } from 'svelte/store';

export const toasts = writable([]);

export function showToast(message, type = 'success', duration = 3000) {
  const id = Date.now();
  const toast = { id, message, type, duration };
  
  toasts.update(list => [...list, toast]);
  
  setTimeout(() => {
    toasts.update(list => list.filter(t => t.id !== id));
  }, duration + 300);
}
