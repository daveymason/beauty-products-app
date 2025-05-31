<script>
  export let currentPage = 1;
  export let totalItems = 0;
  export let itemsPerPage = 20;
  export let onPageChange = () => {};
  
  $: totalPages = Math.ceil(totalItems / itemsPerPage);
  $: startItem = (currentPage - 1) * itemsPerPage + 1;
  $: endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  $: visiblePages = (() => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  })();
  
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }
</script>

<div class="pagination">
  <div class="pagination-info">
    Showing {startItem}-{endItem} of {totalItems} products
  </div>
  
  <div class="pagination-controls">
    <button 
      class="page-btn" 
      disabled={currentPage === 1}
      on:click={() => goToPage(currentPage - 1)}
    >
      Previous
    </button>
    
    {#if visiblePages[0] > 1}
      <button class="page-btn" on:click={() => goToPage(1)}>1</button>
      {#if visiblePages[0] > 2}
        <span class="ellipsis">...</span>
      {/if}
    {/if}
    
    {#each visiblePages as page}
      <button 
        class="page-btn {page === currentPage ? 'active' : ''}"
        on:click={() => goToPage(page)}
      >
        {page}
      </button>
    {/each}
    
    {#if visiblePages[visiblePages.length - 1] < totalPages}
      {#if visiblePages[visiblePages.length - 1] < totalPages - 1}
        <span class="ellipsis">...</span>
      {/if}
      <button class="page-btn" on:click={() => goToPage(totalPages)}>{totalPages}</button>
    {/if}
    
    <button 
      class="page-btn" 
      disabled={currentPage === totalPages}
      on:click={() => goToPage(currentPage + 1)}
    >
      Next
    </button>
  </div>
</div>

<style>
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;
    padding: 1rem 0;
    border-top: 1px solid #e5e5e5;
  }
  
  .pagination-info {
    color: #666;
    font-size: 0.875rem;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .page-btn {
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .page-btn:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #9ca3af;
  }
  
  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-btn.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
  
  .ellipsis {
    padding: 0.5rem;
    color: #9ca3af;
  }
  
  @media (max-width: 640px) {
    .pagination {
      flex-direction: column;
      gap: 1rem;
    }
    
    .pagination-controls {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
