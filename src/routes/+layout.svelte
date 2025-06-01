<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app-layout">
  <Header />
  
  <main class="main-content">
    <slot />
  </main>
  
  <Footer />
</div>

<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(*:focus-visible) {
    outline: 2px solid var(--color-gold);
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media print {
    .app-layout {
      display: block;
    }
    
    :global(.header),
    :global(.footer) {
      display: none;
    }
  }
</style>
