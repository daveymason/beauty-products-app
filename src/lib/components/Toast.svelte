<script>
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';
  
  export let message = '';
  export let type = 'success';
  export let duration = 3000;
  export let onClose = () => {};
  
  let visible = false;
  
  onMount(() => {
    visible = true;
    const timer = setTimeout(() => {
      visible = false;
      setTimeout(onClose, 300);
    }, duration);
    
    return () => clearTimeout(timer);
  });
</script>

<div class="toast {type}" class:visible>
  <div class="toast-content">
    <Icon 
      name={type === 'success' ? 'check' : 'x-circle'} 
      size="20" 
      color="currentColor" 
      class="toast-icon" 
    />
    <span class="toast-message">{message}</span>
  </div>
</div>

<style>
  .toast {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: var(--color-gold-light);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow-premium);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10000;
    max-width: 400px;
    border: 1px solid var(--color-gold);
  }
  
  .toast.visible {
    transform: translateX(0);
    opacity: 1;
  }
  
  .toast.success {
    background: linear-gradient(135deg, var(--color-primary), var(--color-gold-dark));
    border-color: var(--color-gold);
  }
  
  .toast-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .toast-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    stroke: var(--color-gold);
  }
  
  .toast-message {
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  @media (max-width: 768px) {
    .toast {
      top: 1rem;
      left: 1rem;
      right: 1rem;
      max-width: none;
    }
  }
</style>
