<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import ProductModal from '$lib/components/ProductModal.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';
  
  export let data;
  
  console.log('Debug - Products loaded:', data.products?.length);
  
  let currentPage = 1;
  const itemsPerPage = 20;
  let filteredProducts = data.products || [];
  let searchTerm = '';
  let sortBy = 'name';
  let sidebarRef;
  let selectedProduct = null;
  let isModalOpen = false;
  let showMobileFilters = false;
  
  let filterTimeout;
  
  $: totalProducts = filteredProducts.length;
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;
  $: paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  function handlePageChange(page) {
    currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function handleFilterChange(newFilteredProducts) {
    filteredProducts = newFilteredProducts;
    currentPage = 1;
  }
  
  function handleOpenModal(event) {
    selectedProduct = event.detail;
    isModalOpen = true;
  }
  
  function handleCloseModal() {
    isModalOpen = false;
    selectedProduct = null;
  }
  
  function debounce(func, delay) {
    return (...args) => {
      clearTimeout(filterTimeout);
      filterTimeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  
  $: {
    if (data.products) {
      filteredProducts = data.products
        .filter(product => {
          return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        .sort((a, b) => {
          if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
          } else if (sortBy === 'price') {
            return a.price - b.price;
          }
          return 0;
        });
    }
  }
  
  const updateFilters = debounce((newFilteredProducts) => {
    handleFilterChange(newFilteredProducts);
  }, 300);
</script>

<svelte:head>
  <title>Premium Beauty Products | B-Futurist</title>
  <meta name="description" content="Discover premium beauty products including exclusive WhatsApp collections. Shop fragrances, skincare, and luxury cosmetics.">
  <meta name="keywords" content="beauty, fragrances, cosmetics, luxury, exclusive">
  <link rel="canonical" href="/products">
  <meta property="og:title" content="Premium Beauty Products">
  <meta property="og:description" content="Discover premium beauty products including exclusive WhatsApp collections.">
  <meta property="og:type" content="website">
</svelte:head>

<div class="page-container">
  <h1>Products</h1>
  
  {#if data.products}
    <div class="content-layout">
      <aside class="sidebar-container">
        <Sidebar 
          bind:this={sidebarRef}
          products={data.products} 
          {searchTerm}
          {sortBy}
          onFilterChange={handleFilterChange}
        />
      </aside>
      
      <main class="main-content">
        <!-- Mobile Filter Button -->
        <div class="mobile-filter-bar">
          <button class="mobile-filter-btn" on:click={() => sidebarRef?.toggleMobileFilters?.()}>
            <Icon name="filter" size="20" color="#374151" />
            Filters
          </button>
        </div>
        
        <TopBar 
          bind:searchTerm
          bind:sortBy
          totalProducts={totalProducts}
        />
        
        <div class="products-grid">
          {#each paginatedProducts as product}
            <ProductCard {product} on:openModal={handleOpenModal} />
          {/each}
        </div>
        
        {#if totalProducts === 0}
          <div class="no-results">
            <p>No products found matching your criteria.</p>
            <p>Try adjusting your filters.</p>
          </div>
        {/if}
        
        {#if totalProducts > itemsPerPage}
          <Pagination 
            {currentPage}
            totalItems={totalProducts}
            {itemsPerPage}
            onPageChange={handlePageChange}
          />
        {/if}
      </main>
    </div>
  {:else}
    <p>Loading products...</p>
  {/if}
</div>

<ProductModal 
  product={selectedProduct} 
  bind:isOpen={isModalOpen} 
  on:close={handleCloseModal} 
/>

<style>
  .page-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, var(--color-bg), #f8fafc);
    min-height: 100vh;
  }
  
  h1 {
    margin-bottom: 2.5rem;
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-primary), var(--color-gold-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
  }
  
  .content-layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 2.5rem;
  }
  
  .main-content {
    min-width: 0;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .no-results {
    text-align: center;
    padding: 3rem 1rem;
    color: #666;
  }
  
  .no-results p {
    margin: 0.5rem 0;
  }
  
  .mobile-filter-bar {
    display: none;
  }
  
  .mobile-filter-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, var(--glass-bg), white);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    cursor: pointer;
    margin-bottom: 1rem;
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-soft);
    transition: var(--transition-smooth);
  }
  
  .mobile-filter-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
    background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold));
    color: var(--color-primary);
  }
  
  @media (max-width: 1024px) {
    .content-layout {
      grid-template-columns: 250px 1fr;
      gap: 1.5rem;
    }
  }
  
  @media (max-width: 768px) {
    .content-layout {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .sidebar-container {
      order: 2;
    }
    
    .main-content {
      order: 1;
    }
    
    .mobile-filter-bar {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
</style>