<script>
  import Icon from './Icon.svelte';
  
  export let searchTerm = '';
  export let sortBy = 'name';
  export let totalProducts = 0;
</script>

<div class="top-bar">
  <div class="product-count">
    {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
  </div>
  
  <div class="search-container">
    <div class="search-input-wrapper">
      <Icon name="search" size="18" color="#9ca3af" class="search-icon" />
      <input 
        type="text" 
        placeholder="Search products..." 
        bind:value={searchTerm}
        class="search-input"
      />
    </div>
  </div>
  
  <div class="sort-container">
    <span class="sort-label">Sort</span>
    <select 
      id="sort-select"
      bind:value={sortBy} 
      class="sort-select"
    >
      <option value="name">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="brand">Brand (A-Z)</option>
      <option value="brand-desc">Brand (Z-A)</option>
      <option value="price-low">Price (Low to High)</option>
      <option value="price-high">Price (High to Low)</option>
      <option value="newest">Newest First</option>
      <option value="popular">Most Popular</option>
    </select>
  </div>
</div>

<style>
  .top-bar {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 1.5rem;
    align-items: center;
    padding: 1.5rem 0;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--glass-bg);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    box-shadow: var(--shadow-soft);
  }
  
  .product-count {
    color: var(--color-text-light);
    font-size: 0.875rem;
    font-weight: 600;
    padding-left: 1rem;
  }
  
  .search-container {
    display: flex;
    justify-content: center;
  }
  
  .search-input-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
  }
  
  .search-input-wrapper :global(.search-icon) {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 1;
  }
  
  .search-input {
    width: 100%;
    padding: 0.875rem 1.25rem 0.875rem 2.75rem;
    border: 1px solid var(--color-border);
    border-radius: 24px;
    font-size: 0.875rem;
    background: var(--color-card);
    transition: var(--transition-smooth);
    box-shadow: var(--shadow-soft);
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1), var(--shadow-medium);
    background: white;
    transform: scale(1.02);
  }
  
  .sort-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: flex-end;
    padding-right: 1rem;
  }
  
  .sort-label {
    font-size: 0.875rem;
    color: var(--color-text);
    font-weight: 600;
  }
  
  .sort-select {
    padding: 0.625rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 0.875rem;
    background: var(--color-card);
    cursor: pointer;
    transition: var(--transition-smooth);
    box-shadow: var(--shadow-soft);
  }
  
  .sort-select:focus {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    background: white;
  }
  
  @media (max-width: 768px) {
    .top-bar {
      grid-template-columns: 1fr;
      gap: 1rem;
      text-align: center;
    }
    
    .sort-container {
      justify-content: center;
    }
  }
</style>
