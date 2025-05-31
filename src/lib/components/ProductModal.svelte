<script>
  import { createEventDispatcher } from 'svelte';
  import { showToast } from '$lib/stores/toast.js';
  import Icon from './Icon.svelte';
  
  export let product = null;
  export let isOpen = false;
  
  const dispatch = createEventDispatcher();
  
  $: imageUrl = product?.images?.[0]?.[0] || '';
  $: firstVariation = product?.variations?.[0];
  $: price = firstVariation?.price || 0;
  $: regularPrice = firstVariation?.regular_price;
  $: isExclusive = product?.name?.includes('[Exclusively Whatsapp Internal Sales]') || false;
  $: displayName = product?.name?.replace('[Exclusively Whatsapp Internal Sales] ', '').replace(/&amp;/g, '&') || product?.name;
  
  function closeModal() {
    isOpen = false;
    dispatch('close');
  }
  
  function handleAddToCart() {
    showToast(`${displayName} added to cart!`, 'success');
  }
  
  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

{#if isOpen && product}
  <div 
    class="modal-backdrop" 
    role="button" 
    tabindex="0"
    aria-label="Close modal"
    on:click={handleClickOutside}
    on:keydown={(e) => e.key === 'Escape' ? closeModal() : null}
  >
    <div class="modal">
      <button class="close-btn" on:click={closeModal} aria-label="Close modal">
        ×
      </button>
      
      <div class="modal-content">
        <div class="modal-image">
          {#if imageUrl}
            <img 
              src={imageUrl} 
              alt={product.name}
              loading="lazy"
              decoding="async"
            />
          {/if}
        </div>
        
        <div class="modal-details">
          <div class="modal-header">
            <div class="product-info">
              <p class="product-brand">{product.brand}</p>
              {#if isExclusive}
                <div class="exclusive-ribbon" title="WhatsApp Exclusive">
                  <Icon name="whatsapp" size="16" />
                  <span>WhatsApp Exclusive</span>
                </div>
              {/if}
            </div>
          </div>
          
          <h2 class="product-name">{displayName}</h2>
          
          <div class="product-price">
            <span class="current-price">${price}</span>
            {#if regularPrice && regularPrice > price}
              <span class="regular-price">${regularPrice}</span>
            {/if}
          </div>
          
          {#if product.attributes?.['Main Accords']}
            <div class="product-tags">
              <h4>Main Accords</h4>
              <div class="tags-list">
                {#each product.attributes['Main Accords'] as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            </div>
          {/if}
          
          {#if product.attributes?.['Gender']}
            <div class="product-info">
              <strong>For:</strong> {product.attributes['Gender'].join(', ')}
            </div>
          {/if}
          
          {#if product.attributes?.['Size']}
            <div class="product-info">
              <strong>Size:</strong> {product.attributes['Size'].join(', ')}
            </div>
          {/if}
          
          <button class="add-to-cart-btn" on:click={handleAddToCart}>
            <Icon name="cart" size="20" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    backdrop-filter: blur(8px);
  }
  
  .modal {
    background: var(--color-card);
    border-radius: 16px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: var(--shadow-premium);
    border: 1px solid var(--color-gold-light);
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: var(--transition-smooth);
    color: white;
    font-size: 24px;
    font-weight: 300;
    line-height: 1;
    backdrop-filter: blur(8px);
  }
  
  .close-btn:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
  
  .close-btn:focus {
    outline: 2px solid var(--color-gold);
    outline-offset: 2px;
  }
  
  .modal-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
  }
  
  .modal-image {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-image img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: var(--shadow-medium);
  }
  
  .modal-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .modal-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .product-brand {
    font-size: 0.875rem;
    color: var(--color-text-light);
    margin: 0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .exclusive-ribbon {
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: white;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: var(--shadow-gold);
    width: fit-content;
  }
  
  .product-name {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--color-text);
    line-height: 1.3;
  }
  
  .product-price {
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }
  
  .current-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    text-shadow: 
      -1px -1px 0 var(--color-gold),
      1px -1px 0 var(--color-gold),
      -1px 1px 0 var(--color-gold),
      1px 1px 0 var(--color-gold),
      0 0 3px var(--color-gold-light);
  }
  
  .regular-price {
    font-size: 1rem;
    text-decoration: line-through;
    color: var(--color-text-muted);
  }
  
  .product-tags h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: var(--color-text);
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    padding: 0.25rem 0.75rem;
    background: var(--color-gold-light);
    border: 1px solid var(--color-gold);
    color: var(--color-primary);
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
  }
  
  .product-info {
    font-size: 0.875rem;
    color: var(--color-text);
  }
  
  .product-info strong {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .add-to-cart-btn {
    background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold));
    border: 1px solid var(--color-gold);
    border-radius: 12px;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary);
    cursor: pointer;
    transition: var(--transition-smooth);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: auto;
  }
  
  .add-to-cart-btn:hover {
    background: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-gold);
  }
  
  @media (max-width: 768px) {
    .modal-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1.5rem;
    }
    
    .product-name {
      font-size: 1.25rem;
    }
    
    .current-price {
      font-size: 1.25rem;
    }
  }
</style>
