<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import ProductModal from '$lib/components/ProductModal.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';
  
  export let data;
  
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
  <title>Perfumenow | Niche Perfume & Beauty</title>
  <meta name="description" content="Discover premium beauty products and exclusive collections at Perfumenow. Shop luxury fragrances, skincare, and cosmetics.">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://flourishing-biscotti-c23ea6.netlify.app/">
  <meta property="og:title" content="Perfumenow | Niche Perfume & Beauty">
  <meta property="og:description" content="Discover premium beauty products and exclusive collections at Perfumenow. Shop luxury fragrances, skincare, and cosmetics.">
  <meta property="og:image" content="https://flourishing-biscotti-c23ea6.netlify.app/android-chrome-512x512.png">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <meta property="og:site_name" content="Perfumenow">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:url" content="https://flourishing-biscotti-c23ea6.netlify.app/">
  <meta name="twitter:title" content="Perfumenow | Niche Perfume & Beauty">
  <meta name="twitter:description" content="Discover premium beauty products and exclusive collections at Perfumenow. Shop luxury fragrances, skincare, and cosmetics.">
  <meta name="twitter:image" content="https://flourishing-biscotti-c23ea6.netlify.app/android-chrome-512x512.png">
  
  <!-- Additional SEO -->
  <link rel="canonical" href="https://flourishing-biscotti-c23ea6.netlify.app/">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Perfumenow">
  <meta name="keywords" content="beauty, fragrances, cosmetics, luxury, exclusive, niche perfume">
</svelte:head>

<div class="page-container">
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
        <!-- Mobile Filters to be on top -->
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
    margin: 0 10%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--color-bg), #f8fafc);
    min-height: calc(100vh - 8rem); /* FOr header and footer */
  }
  
  .content-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 1rem;
    max-width: 100%;
    overflow: hidden;
  }
  
  .main-content {
    min-width: 0;
    overflow: hidden;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 700px) {
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 1rem;
    }
  }

  @media (min-width: 900px) {
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.25rem;
    }
  }

  @media (min-width: 1100px) {
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 1.25rem;
    }
  }

  @media (min-width: 1300px) {
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
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
    background: var(--glass-bg);
    border: 1px solid var(--color-border);
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
      grid-template-columns: 200px 1fr;
      gap: 1rem;
    }
  }
  
  @media (max-width: 900px) {
    .content-layout {
      grid-template-columns: 190px 1fr;
      gap: 0.75rem;
    }
  }
  
  @media (max-width: 768px) {
    .page-container {
      margin: 0 2%;
      padding: 0.75rem;
    }
    
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
  
  @media (max-width: 480px) {
    .page-container {
      margin: 0;
      padding: 0.5rem;
    }
    
    .mobile-filter-btn {
      padding: 0.625rem 1.25rem;
      font-size: 0.9rem;
    }
  }
</style> 