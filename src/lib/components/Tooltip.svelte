<script>
  export let text = '';
  export let position = 'top'; // top, bottom, left, right
  
  let showTooltip = false;
  let tooltipElement;
  let wrapperElement;
  let tooltipPosition = { x: 0, y: 0 };
  
  function calculatePosition() {
    if (!wrapperElement) return;
    
    const rect = wrapperElement.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    switch (position) {
      case 'top':
        tooltipPosition = {
          x: rect.left + rect.width / 2 + scrollX,
          y: rect.top + scrollY - 8
        };
        break;
      case 'bottom':
        tooltipPosition = {
          x: rect.left + rect.width / 2 + scrollX,
          y: rect.bottom + scrollY + 8
        };
        break;
      case 'left':
        tooltipPosition = {
          x: rect.left + scrollX - 8,
          y: rect.top + rect.height / 2 + scrollY
        };
        break;
      case 'right':
        tooltipPosition = {
          x: rect.right + scrollX + 8,
          y: rect.top + rect.height / 2 + scrollY
        };
        break;
    }
  }
  
  function handleMouseEnter() {
    showTooltip = true;
    calculatePosition();
  }
  
  function handleMouseLeave() {
    showTooltip = false;
  }
</script>

<div 
  class="tooltip-wrapper"
  role="button"
  tabindex="0"
  aria-label={text}
  bind:this={wrapperElement}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:focus={handleMouseEnter}
  on:blur={handleMouseLeave}
>
  <slot />
</div>

{#if showTooltip && text}
  <div 
    class="tooltip {position}" 
    bind:this={tooltipElement}
    style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
  >
    {text}
    <div class="tooltip-arrow"></div>
  </div>
{/if}

<style>
  .tooltip-wrapper {
    position: relative;
    display: inline-block;
  }
  
  .tooltip {
    position: fixed;
    background: var(--color-primary);
    color: var(--color-gold-light);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    z-index: 10001;
    box-shadow: var(--shadow-medium);
    border: 1px solid var(--color-gold);
    opacity: 0;
    animation: fadeIn 0.2s ease-out forwards;
    pointer-events: none;
    max-width: 200px;
    word-wrap: break-word;
    white-space: normal;
  }
  
  .tooltip.top {
    transform: translate(-50%, -100%);
  }
  
  .tooltip.bottom {
    transform: translate(-50%, 0);
  }
  
  .tooltip.left {
    transform: translate(-100%, -50%);
  }
  
  .tooltip.right {
    transform: translate(0, -50%);
  }
  
  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
  }
  
  .tooltip.top .tooltip-arrow {
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid var(--color-primary);
  }
  
  .tooltip.bottom .tooltip-arrow {
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid var(--color-primary);
  }
  
  .tooltip.left .tooltip-arrow {
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid var(--color-primary);
  }
  
  .tooltip.right .tooltip-arrow {
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 4px solid var(--color-primary);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .tooltip.bottom {
    animation-name: fadeInBottom;
  }
  
  @keyframes fadeInBottom {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
</style>
