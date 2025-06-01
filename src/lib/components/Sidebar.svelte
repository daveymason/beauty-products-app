<script>
  import Icon from './Icon.svelte';
  import { createToggleFunction } from '$lib/utils/index.js';
  
  export let products = [];
  export let searchTerm = '';
  export let sortBy = 'name';
  export let onFilterChange = () => {};
  
  let selectedBrands = [];
  let selectedAccords = [];
  let selectedGenders = [];
  let selectedTypes = [];
  let selectedCollections = [];
  let priceRange = { min: 0, max: 1000 };
  let sizeRange = { min: 0, max: 100 };
  let showMobileFilters = false;
  
  $: uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
  $: uniqueAccords = [...new Set(
    products.flatMap(p => p.attributes?.['Main Accords'] || [])
  )].sort();
  $: uniqueGenders = [...new Set(
    products.flatMap(p => p.attributes?.['Gender'] || [])
  )].sort();
  $: uniqueTypes = [...new Set(
    products.flatMap(p => p.attributes?.['type'] || [])
  )].sort();
  $: uniqueCollections = [...new Set(
    products.flatMap(p => p.attributes?.['Collection Line'] || [])
  )].filter(Boolean).sort();
  
  // Extract numeric sizes for slider for this demo
  $: allSizes = products.flatMap(p => p.attributes?.['Size'] || []);
  $: numericSizes = allSizes
    .map(size => parseFloat(size.match(/\d+(\.\d+)?/)?.[0] || '0'))      
    .filter(size => size > 0);
  $: minSize = Math.min(...numericSizes, 0);
  $: maxSize = Math.max(...numericSizes, 100);
  
  $: if (numericSizes.length > 0) {
    sizeRange.min = minSize;
    sizeRange.max = maxSize;
  }
  
  $: productPrices = products.flatMap(p => 
    p.variations?.map(v => v.price) || []
  ).filter(Boolean);
  $: minPrice = Math.min(...productPrices, 0);
  $: maxPrice = Math.max(...productPrices, 1000);
  
  $: if (productPrices.length > 0) {
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
  }
  
  $: filteredAndSortedProducts = (() => {
    let filtered = products.filter(product => {
        // The works for both the name of the product and the brand name
      if (searchTerm && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const brandMatch = product.brand?.toLowerCase().includes(searchLower);
        if (!nameMatch && !brandMatch) {
          return false;
        }
      }
      
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      if (selectedAccords.length > 0) {
        const productAccords = product.attributes?.['Main Accords'] || [];
        const hasSelectedAccord = selectedAccords.some(accord => productAccords.includes(accord));
        
        if (!hasSelectedAccord) {
          return false;
        }
      }
      
      if (selectedGenders.length > 0) {
        const productGenders = product.attributes?.['Gender'] || [];
        if (!selectedGenders.some(gender => productGenders.includes(gender))) {
          return false;
        }
      }
      
      if (selectedTypes.length > 0) {
        const productTypes = product.attributes?.['type'] || [];
        if (!selectedTypes.some(type => productTypes.includes(type))) {
          return false;
        }
      }
      
      if (sizeRange.min > minSize || sizeRange.max < maxSize) {
        const productSizes = product.attributes?.['Size'] || [];
        const productNumericSizes = productSizes
          .map(size => parseFloat(size.match(/\d+(\.\d+)?/)?.[0] || '0'))
          .filter(size => size > 0);
        
        if (productNumericSizes.length === 0 || 
            !productNumericSizes.some(size => size >= sizeRange.min && size <= sizeRange.max)) {
          return false;
        }
      }
      
      if (selectedCollections.length > 0) {
        const productCollections = product.attributes?.['Collection Line'] || [];
        if (!selectedCollections.some(collection => productCollections.includes(collection))) {
          return false;
        }
      }
      
      const productPrice = product.variations?.[0]?.price || 0;
      if (productPrice < priceRange.min || productPrice > priceRange.max) {
        return false;
      }
      
      return true;
    });
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'brand':
          return (a.brand || '').localeCompare(b.brand || '');
        case 'brand-desc':
          return (b.brand || '').localeCompare(a.brand || '');
        case 'price-low':
          const aDisplayPrice = Math.min(...(a.variations?.map(v => v.price) || [0]));
          const bDisplayPrice = Math.min(...(b.variations?.map(v => v.price) || [0]));
          return aDisplayPrice - bDisplayPrice;
        case 'price-high':
          const aDisplayPriceHigh = Math.min(...(a.variations?.map(v => v.price) || [0]));
          const bDisplayPriceHigh = Math.min(...(b.variations?.map(v => v.price) || [0]));
          return bDisplayPriceHigh - aDisplayPriceHigh;
        case 'newest':
          // Assumed the newest products have the highest IDs
          return parseInt(b.id) - parseInt(a.id);
        case 'popular':
          // Assumed that the mre stock we have the more popular the product is
          const aStock = a.variations?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;
          const bStock = b.variations?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;
          return bStock - aStock;
        default:
          return 0;
      }
    });
    
    return filtered;
  })();
  
  // MAke sure all the filter parameters work
  $: {
    onFilterChange(filteredAndSortedProducts);
  }
  
  // Create toggle functions using utility
  $: toggleBrand = createToggleFunction(selectedBrands, (val) => selectedBrands = val);
  $: toggleAccord = createToggleFunction(selectedAccords, (val) => selectedAccords = val);
  $: toggleGender = createToggleFunction(selectedGenders, (val) => selectedGenders = val);
  $: toggleType = createToggleFunction(selectedTypes, (val) => selectedTypes = val);
  $: toggleCollection = createToggleFunction(selectedCollections, (val) => selectedCollections = val);
  
  function clearAllFilters() {
    selectedBrands = [];
    selectedAccords = [];
    selectedGenders = [];
    selectedTypes = [];
    selectedCollections = [];
    priceRange = { min: minPrice, max: maxPrice };
    sizeRange = { min: minSize, max: maxSize };
  }
  
  export function toggleMobileFilters() {
    showMobileFilters = !showMobileFilters;
  }
  
  function handleSizeMinChange(event) {
    const value = parseInt(event.target.value);
    if (value <= sizeRange.max) {
      sizeRange.min = value;
    }
  }
  
  function handleSizeMaxChange(event) {
    const value = parseInt(event.target.value);
    if (value >= sizeRange.min) {
      sizeRange.max = value;
    }
  }
</script>

{#if showMobileFilters}
  <div class="mobile-filter-modal">
    <div class="mobile-filter-header">
      <span>Filters</span>
      <button class="close-btn" on:click={() => showMobileFilters = false}>&times;</button>
    </div>
    <div class="mobile-filter-content">
      <div class="filter-section">
        <h4>Price Range</h4>
        <div class="price-inputs">
          <input type="number" placeholder="Min" bind:value={priceRange.min} min={minPrice} max={maxPrice} class="price-input" />
          <span>-</span>
          <input type="number" placeholder="Max" bind:value={priceRange.max} min={minPrice} max={maxPrice} class="price-input" />
        </div>
      </div>
      <div class="filter-section">
        <h4>Size Range (ml)</h4>
        <div class="size-inputs">
          <input 
            type="number" 
            placeholder="Min" 
            bind:value={sizeRange.min}
            min={minSize}
            max={maxSize}
            class="size-input"
            on:change={handleSizeMinChange}
          />
          <span>-</span>
          <input 
            type="number" 
            placeholder="Max" 
            bind:value={sizeRange.max}
            min={minSize}
            max={maxSize}
            class="size-input"
            on:change={handleSizeMaxChange}
          />
        </div>
      </div>
      <div class="filter-section">
        <h4>For Who</h4>
        <div class="checkbox-list">
          {#each uniqueGenders as gender}
            <label class="checkbox-item">
              <input type="checkbox" checked={selectedGenders.includes(gender)} on:change={() => toggleGender(gender)} />
              <span>{gender}</span>
            </label>
          {/each}
        </div>
      </div>
      <div class="filter-section">
        <h4>Type</h4>
        <div class="checkbox-list">
          {#each uniqueTypes as type}
            <label class="checkbox-item">
              <input type="checkbox" checked={selectedTypes.includes(type)} on:change={() => toggleType(type)} />
              <span>{type}</span>
            </label>
          {/each}
        </div>
      </div>
      {#if uniqueCollections.length > 0}
      <div class="filter-section">
        <h4>Collection</h4>
        <div class="checkbox-list">
          {#each uniqueCollections as collection}
            <label class="checkbox-item">
              <input type="checkbox" checked={selectedCollections.includes(collection)} on:change={() => toggleCollection(collection)} />
              <span>{collection}</span>
            </label>
          {/each}
        </div>
      </div>
      {/if}
      <div class="filter-section">
        <h4>Brands</h4>
        <div class="checkbox-list">
          {#each uniqueBrands.slice(0, 6) as brand}
            <label class="checkbox-item">
              <input type="checkbox" checked={selectedBrands.includes(brand)} on:change={() => toggleBrand(brand)} />
              <span>{brand}</span>
            </label>
          {/each}
        </div>
      </div>
      <div class="filter-section">
        <h4>Main Accords</h4>
        <div class="checkbox-list">
          {#each uniqueAccords as accord}
            <label class="checkbox-item">
              <input type="checkbox" checked={selectedAccords.includes(accord)} on:change={() => toggleAccord(accord)} />
              <span>{accord}</span>
            </label>
          {/each}
        </div>
      </div>
    </div>
    <button class="apply-btn" on:click={() => showMobileFilters = false}>Apply Filters</button>
  </div>
  <div 
    class="mobile-filter-backdrop" 
    role="button" 
    tabindex="0"
    aria-label="Close filters"
    on:click={() => showMobileFilters = false}
    on:keydown={(e) => e.key === 'Escape' ? showMobileFilters = false : null}
  ></div>
{/if}

<div class="sidebar desktop-only">
  <div class="sidebar-header">
    <h3>Filters</h3>
    <button class="clear-btn" on:click={clearAllFilters}>
      <Icon name="clear" size="16" />
      Clear All
    </button>
  </div>
  
  <div class="filter-section">
    <h4>Price Range</h4>
    <div class="price-inputs">
      <input 
        type="number" 
        placeholder="Min" 
        bind:value={priceRange.min}
        min={minPrice}
        max={maxPrice}
        class="price-input"
      />
      <span>-</span>
      <input 
        type="number" 
        placeholder="Max" 
        bind:value={priceRange.max}
        min={minPrice}
        max={maxPrice}
        class="price-input"
      />
    </div>
  </div>
  
  <div class="filter-section">
    <h4>Size Range (ml)</h4>
    <div class="size-inputs">
      <input 
        type="number" 
        placeholder="Min" 
        bind:value={sizeRange.min}
        min={minSize}
        max={maxSize}
        class="size-input"
        on:change={handleSizeMinChange}
      />
      <span>-</span>
      <input 
        type="number" 
        placeholder="Max" 
        bind:value={sizeRange.max}
        min={minSize}
        max={maxSize}
        class="size-input"
        on:change={handleSizeMaxChange}
      />
    </div>
  </div>
  
  <div class="filter-section">
    <h4>For Who</h4>
    <div class="checkbox-list">
      {#each uniqueGenders as gender}
        <label class="checkbox-item">
          <input 
            type="checkbox" 
            checked={selectedGenders.includes(gender)}
            on:change={() => toggleGender(gender)}
          />
          <span>{gender}</span>
        </label>
      {/each}
    </div>
  </div>
  
  <div class="filter-section">
    <h4>Type</h4>
    <div class="checkbox-list">
      {#each uniqueTypes as type}
        <label class="checkbox-item">
          <input 
            type="checkbox" 
            checked={selectedTypes.includes(type)}
            on:change={() => toggleType(type)}
          />
          <span>{type}</span>
        </label>
      {/each}
    </div>
  </div>
  
  {#if uniqueCollections.length > 0}
  <div class="filter-section">
    <h4>Collection</h4>
    <div class="checkbox-list">
      {#each uniqueCollections as collection}
        <label class="checkbox-item">
          <input 
            type="checkbox" 
            checked={selectedCollections.includes(collection)}
            on:change={() => toggleCollection(collection)}
          />
          <span>{collection}</span>
        </label>
      {/each}
    </div>
  </div>
  {/if}
  
  <div class="filter-section">
    <h4>Brands</h4>
    <div class="checkbox-list">
      {#each uniqueBrands.slice(0, 6) as brand}
        <label class="checkbox-item">
          <input 
            type="checkbox" 
            checked={selectedBrands.includes(brand)}
            on:change={() => toggleBrand(brand)}
          />
          <span>{brand}</span>
        </label>
      {/each}
    </div>
  </div>
  
  <div class="filter-section">
    <h4>Main Accords</h4>
    <div class="checkbox-list">
      {#each uniqueAccords as accord}
        <label class="checkbox-item">
          <input 
            type="checkbox" 
            checked={selectedAccords.includes(accord)}
            on:change={() => toggleAccord(accord)}
          />
          <span>{accord}</span>
        </label>
      {/each}
    </div>
  </div>
</div>

<style>
  .sidebar {
    background: var(--glass-bg);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 1rem;
    height: fit-content;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    overflow-x: hidden;
    position: sticky;
    top: 1rem;
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-medium);
    transition: var(--transition-smooth);
    min-width: 0;
  }
  
  .sidebar:hover {
    box-shadow: var(--shadow-premium);
    border-color: var(--color-gold-light);
  }
  
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: -1rem -1rem 1rem -1rem;
    padding: 1rem 1rem 0.75rem 1rem;
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: -1rem;
    background: var(--color-card);
    backdrop-filter: blur(12px);
    z-index: 100;
    border-radius: 16px 16px 0 0;
  }
  
  .sidebar-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--color-primary), var(--color-gold-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .clear-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold));
    border: none;
    padding: 0.375rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    color: var(--color-primary);
    transition: var(--transition-smooth);
    box-shadow: var(--shadow-soft);
  }
  
  .clear-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-gold);
    background: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
    color: white;
  }
  
  .filter-section {
    margin-bottom: 1rem;
    min-width: 0;
  }
  
  .filter-section h4 {
    margin: 0 0 0.75rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
    position: relative;
  }
  
  .filter-section h4::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 20px;
    height: 2px;
    background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
    border-radius: 2px;
  }
  
  .price-inputs, .size-inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .price-input, .size-input {
    flex: 1;
    padding: 0.5rem 0.625rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 0.8rem;
    background: var(--color-card);
    transition: var(--transition-smooth);
  }
  
  .price-input:focus, .size-input:focus {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    background: white;
  }
  
  .checkbox-list {
    max-height: 150px;
    overflow-y: auto;
  }
  
  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    cursor: pointer;
    font-size: 0.875rem;
    min-width: 0;
  }

  .checkbox-item span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .checkbox-item input[type="checkbox"] {
    margin: 0;
  }
  
  .checkbox-item:hover {
    color: #3b82f6;
  }
  
  .mobile-filter-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: white;
    z-index: 2000;
    padding: 1.5rem 1rem 1rem 1rem;
    overflow-y: auto;
    max-width: 480px;
    margin: 0 auto;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    animation: slideDown 0.2s;
  }
  @keyframes slideDown {
    from { transform: translateY(-40px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .mobile-filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: #374151;
    cursor: pointer;
    line-height: 1;
  }
  .mobile-filter-content {
    max-height: 60vh;
    overflow-y: auto;
  }
  .apply-btn {
    width: 100%;
    margin-top: 1.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .mobile-filter-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.18);
    z-index: 1999;
  }
  .desktop-only {
    display: block;
  }
  @media (max-width: 768px) {
    .sidebar.desktop-only {
      display: none;
    }
  }
  
  @media (max-resolution: 150dpi), (max-device-pixel-ratio: 1.5) {
    .sidebar {
      border-width: 1.5px;
    }
    
    .price-input, .size-input {
      border-width: 1.5px;
    }
    
    .price-input:focus, .size-input:focus {
      border-width: 2px;
    }
    
    .sidebar-header {
      border-bottom-width: 1.5px;
    }
    
    .checkbox-item input[type="checkbox"] {
      border: 1.5px solid var(--color-border);
    }
  }
</style>