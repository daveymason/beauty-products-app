<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';
  import { 
    getGenderEmoji, 
    getMinPrice, 
    isExclusiveProduct, 
    processProductName,
    getFirstImageUrl 
  } from '$lib/utils/index.js';
  import { getAccordStyle } from '$lib/utils/styles.js';
  
  export let product;
  export let currentPage;
  
  const dispatch = createEventDispatcher();
  
  $: imageUrl = getFirstImageUrl(product.images);
  $: firstVariation = product.variations?.[0];
  $: price = getMinPrice(product.variations);
  $: regularPrice = product.variations?.find(v => v.price === price)?.regular_price;
  $: isExclusive = isExclusiveProduct(product.name);
  $: displayName = processProductName(product.name);
  $: availableSizes = product.attributes?.['Size'] || [];
  $: collectionLine = product.attributes?.['Collection Line']?.[0] || null;
  $: gender = product.attributes?.['Gender']?.[0] || null;
  
  let isAdding = false;
  
  function handleAddToCart(event) {
    event.stopPropagation();
    isAdding = true;
    
    setTimeout(() => {
      isAdding = false;
    }, 1200);
  }
  
  function handleCardClick() {
    dispatch('openModal', product);
  }
</script>

<div 
  class="product-card" 
  role="button" 
  tabindex="0" 
  on:click={handleCardClick}
  on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? handleCardClick(e) : null}
  aria-label="View {displayName} details"
>
  <div class="card-header">
    <div class="brand-section">
      <p class="product-brand">{product.brand}</p>
    </div>
    {#if isExclusive}
      <div class="exclusive-ribbon">
        <Icon name="whatsapp" size="16" />
      </div>
    {/if}
  </div>
  
  <div class="product-info">
    <h3 class="product-name">
      {displayName}
    </h3>
    
    <div class="product-details">
      {#if gender && getGenderEmoji(gender)}
        <span class="gender-emoji">{getGenderEmoji(gender)}</span>
      {/if}
      {#if availableSizes.length > 0}
        <div class="product-sizes-box">
          {availableSizes.join(' • ')}
        </div>
      {/if}
    </div>
  </div>
  
  {#if imageUrl}
    <img 
      src={imageUrl} 
      alt={product.name} 
      class="product-image"
      loading={currentPage === 1 ? 'eager' : 'lazy'} 
      decoding="async"
      fetchpriority={currentPage === 1 ? 'high' : 'auto'}
    />
  {/if}
  
  <div class="product-price">
    <span class="current-price">${price}</span>
    {#if regularPrice && regularPrice > price}
      <span class="regular-price">${regularPrice}</span>
    {/if}
  </div>
  
  {#if product.attributes?.['Main Accords'] && product.attributes['Main Accords'].length > 0 && !collectionLine}
    <div class="product-tags">
      {#each product.attributes['Main Accords'] as tag}
        <span class="tag" style={getAccordStyle(tag)}>{tag}</span>
      {/each}
    </div>
  {/if}

  {#if collectionLine}
    <div class="collection-signature">
      {collectionLine}
    </div>
  {/if}

  <!-- Spacer to push add-to-cart button to bottom -->
  <div class="spacer"></div>

  <button class="add-to-cart-footer" on:click={handleAddToCart} disabled={isAdding}>
    {#if isAdding}
      <Icon name="check" size="20" />
      Added!
    {:else}
      <Icon name="cart" size="20" />
      Add to Cart
    {/if}
  </button>
</div>

<style>
  .product-card {
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1.25rem;
    background: var(--color-card);
    position: relative;
    overflow: visible; 
    transition: var(--transition-smooth);
    box-shadow: var(--shadow-soft);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    min-height: 450px;
  }
  
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-premium);
    border-color: var(--color-gold-light);
  }
  
  .product-card:active {
    transform: translateY(-2px);
    transition: var(--transition-bounce);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0;
  }
  
  .brand-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
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
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: var(--shadow-gold);
    transition: var(--transition-smooth);
    backdrop-filter: blur(8px);
    flex-shrink: 0;
  }
  
  .exclusive-ribbon:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 32px rgba(37, 211, 102, 0.3);
  }
  
  .product-name {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: var(--color-text);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .product-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .gender-emoji {
    font-size: 1rem;
    line-height: 1;
  }
  
  .product-sizes-box {
    font-size: 0.75rem;
    font-weight: 500;
    color: #374151;
    background: linear-gradient(135deg, var(--color-bg), #f8fafc);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    line-height: 1.2;
  }
  
  .product-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 8px;
    transition: var(--transition-smooth);
    background: var(--color-bg);
  }
  
  .product-card:hover .product-image {
    transform: scale(1.02);
    filter: brightness(1.05);
  }
  
  .product-price {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .current-price {
    font-size: 1.25rem;
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
    font-size: 0.875rem;
    text-decoration: line-through;
    color: var(--color-text-muted);
  }
  
  .add-to-cart-footer {
    background: linear-gradient(135deg, var(--color-bg), #f8fafc);
    border: 1px solid var(--color-border);
    border-radius: 0 0 8px 8px;
    padding: 1rem;
    margin: 1rem -1.25rem -1.25rem -1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text);
    cursor: pointer;
    transition: var(--transition-smooth);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-top: 1px solid var(--color-border);
    width: calc(100% + 2.5rem);
    box-sizing: border-box;
  }
  
  .add-to-cart-footer:hover {
    background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold));
    color: var(--color-primary);
    border-color: var(--color-gold);
  }
  
  .add-to-cart-footer:active {
    transform: translateY(1px);
    background: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
  }
  
  .add-to-cart-footer:disabled {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    cursor: not-allowed;
    border-color: #10b981;
  }
  
  .product-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    flex-grow: 1;
    align-content: flex-start;
  }
  
  .tag {
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 600;
    transition: var(--transition-smooth);
    backdrop-filter: blur(4px);
    text-transform: capitalize;
    box-shadow: var(--shadow-soft);
    position: relative;
    overflow: hidden;
  }
  
  .tag:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: var(--shadow-medium);
    filter: brightness(0.95);
  }
  
  .collection-signature {
    text-align: center;
    font-family: 'Times New Roman', serif;
    font-size: 0.875rem;
    font-style: italic;
    color: var(--color-text-light);
    opacity: 0.8;
    margin: 0.5rem 0;
    padding: 0.25rem 0;
    position: relative;
  }
  
  .collection-signature::before {
    content: '~ ';
    opacity: 0.6;
  }
  
  .collection-signature::after {
    content: ' ~';
    opacity: 0.6;
  }
  
  .spacer {
    flex-grow: 1;
  }
  
  @media (max-width: 768px) {
    .add-to-cart-footer {
      margin: 1rem -1.25rem -1.25rem -1.25rem;
      width: calc(100% + 2.5rem);
      padding: 1.25rem 1rem;
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    .product-card {
      padding: 1rem;
      min-height: 420px;
    }
    
    .add-to-cart-footer {
      margin: 1rem 0 -1rem 0;
      width: auto;
      padding: 1rem 2rem;
      font-size: 0.875rem;
      border-radius: 8px;
      border: 1px solid var(--color-border);
      align-self: center;
    }
  }
  
  @media (max-resolution: 150dpi), (max-device-pixel-ratio: 1.5) {
    .product-card {
      border-width: 1.5px;
      box-shadow: var(--shadow-medium);
    }
    
    .product-card:hover {
      border-width: 2px;
    }
    
    .add-to-cart-footer {
      border-top-width: 1.5px;
    }
    
    .tag {
      border-width: 1.5px;
    }
    
    .product-sizes-box {
      border-width: 1.5px;
    }
    
    .collection-signature {
      font-weight: 500;
      opacity: 0.9;
    }
  }
</style>
