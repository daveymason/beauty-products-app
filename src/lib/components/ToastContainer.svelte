<script>
  import { toasts } from '$lib/stores/toast.js';
  import Toast from './Toast.svelte';
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <Toast 
      message={toast.message} 
      type={toast.type} 
      duration={toast.duration}
      onClose={() => toasts.update(list => list.filter(t => t.id !== toast.id))}
    />
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10000;
    pointer-events: none;
  }
  
  .toast-container :global(.toast) {
    pointer-events: auto;
    margin-bottom: 0.5rem;
  }
</style>
