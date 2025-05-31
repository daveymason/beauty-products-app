<script>
  import { createEventDispatcher } from 'svelte';
  import { showToast } from '$lib/stores/toast.js';
  import Tooltip from './Tooltip.svelte';
  import Icon from './Icon.svelte';
  
  export let product;
  
  const dispatch = createEventDispatcher();
  
  $: imageUrl = product.images?.[0]?.[0] || '';
  $: firstVariation = product.variations?.[0];
  $: price = firstVariation?.price || 0;
  $: regularPrice = firstVariation?.regular_price;
  $: isExclusive = product.name?.includes('[Exclusively Whatsapp Internal Sales]') || false;
  $: displayName = product.name?.replace('[Exclusively Whatsapp Internal Sales] ', '').replace(/&amp;/g, '&') || product.name;
  
  const accordColors = {
    amber: { bg: '#fef3e2', border: '#fbbf24', text: '#92400e' },
    aquatic: { bg: '#ecfeff', border: '#06b6d4', text: '#164e63' },
    aromatic: { bg: '#ecfdf5', border: '#10b981', text: '#064e3b' },
    balsamic: { bg: '#f3e8ff', border: '#8b5cf6', text: '#4c1d95' },
    cinnamon: { bg: '#fef2f2', border: '#dc2626', text: '#7f1d1d' },
    citrus: { bg: '#fefce8', border: '#eab308', text: '#a16207' },
    earthy: { bg: '#f7f6f3', border: '#a3a3a3', text: '#404040' },
    floral: { bg: '#fdf2f8', border: '#ec4899', text: '#831843' },
    fresh: { bg: '#f0fdfa', border: '#22d3ee', text: '#155e75' },
    'fresh spicy': { bg: '#ecfdf5', border: '#059669', text: '#064e3b' },
    fruity: { bg: '#fdf2f8', border: '#fb7185', text: '#881337' },
    green: { bg: '#f7fee7', border: '#84cc16', text: '#365314' },
    herbal: { bg: '#f0fdf4', border: '#22c55e', text: '#14532d' },
    iris: { bg: '#f5f3ff', border: '#a855f7', text: '#581c87' },
    lactonic: { bg: '#fffbeb', border: '#f59e0b', text: '#a16207' },
    leather: { bg: '#f5f5f4', border: '#78716c', text: '#292524' },
    marine: { bg: '#f0f9ff', border: '#0ea5e9', text: '#0c4a6e' },
    musky: { bg: '#f8fafc', border: '#64748b', text: '#334155' },
    oud: { bg: '#fafaf9', border: '#57534e', text: '#1c1917' },
    ozonic: { bg: '#f0f9ff', border: '#38bdf8', text: '#0369a1' },
    patchouli: { bg: '#f6f6f4', border: '#78716c', text: '#1c1917' },
    powdery: { bg: '#faf5ff', border: '#c084fc', text: '#6b21a8' },
    rose: { bg: '#fdf2f8', border: '#f472b6', text: '#9d174d' },
    smoky: { bg: '#f8fafc', border: '#475569', text: '#1e293b' },
    spicy: { bg: '#fef2f2', border: '#ef4444', text: '#7f1d1d' },
    sweet: { bg: '#fef7ff', border: '#f472b6', text: '#831843' },
    tobacco: { bg: '#f7f6f3', border: '#92400e', text: '#451a03' },
    tuberose: { bg: '#fffbeb', border: '#f59e0b', text: '#a16207' },
    vanilla: { bg: '#fffbeb', border: '#fbbf24', text: '#92400e' },
    'warm spicy': { bg: '#fef2f2', border: '#f97316', text: '#9a3412' },
    'white floral': { bg: '#fefefe', border: '#e5e7eb', text: '#374151' },
    woody: { bg: '#f7f6f3', border: '#92400e', text: '#451a03' }
  };
  
  function getAccordStyle(accord) {
    const accordKey = accord.toLowerCase();
    const colors = accordColors[accordKey] || { bg: 'var(--color-bg)', border: 'var(--color-border)', text: 'var(--color-text)' };
    return `background: ${colors.bg}; border: 1px solid ${colors.border}; color: ${colors.text};`;
  }
  
  function handleAddToCart(event) {
    event.stopPropagation();
    showToast(`${displayName} added to cart!`, 'success');
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
    <p class="product-brand">{product.brand}</p>
    {#if isExclusive}
      <Tooltip text="WhatsApp Exclusive" position="top">
        <div class="exclusive-ribbon">
          <Icon name="whatsapp" size="16" />
        </div>
      </Tooltip>
    {/if}
  </div>
  
  <h3 class="product-name">{displayName}</h3>
  
  {#if imageUrl}
    <img 
      src={imageUrl} 
      alt={product.name} 
      class="product-image"
      loading="lazy"
      decoding="async"
    />
  {/if}
  
  <div class="product-price">
    <span class="current-price">${price}</span>
    {#if regularPrice && regularPrice > price}
      <span class="regular-price">${regularPrice}</span>
    {/if}
  </div>
  
  <div class="product-tags">
    {#if product.attributes?.['Main Accords']}
      {#each product.attributes['Main Accords'] as tag}
        <span class="tag" style={getAccordStyle(tag)}>{tag}</span>
      {/each}
    {/if}
  </div>

  <button class="add-to-cart-footer" on:click={handleAddToCart}>
    <Icon name="cart" size="20" />
    Add to Cart
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
    -webkit-box-orient: vertical;
    overflow: hidden;
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
</style>
