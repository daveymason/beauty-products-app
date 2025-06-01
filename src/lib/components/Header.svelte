<script>
  import Icon from './Icon.svelte';

  let userMenuOpen = false;

  function toggleUserMenu() {
    userMenuOpen = !userMenuOpen;
  }

  function closeUserMenu() {
    userMenuOpen = false;
  }
</script>

<header class="header">
  <div class="header-container">
    <div class="logo-section">
      <a href="/" class="logo">
        <span class="logo-text">Perfumenow</span>
        <span class="logo-tagline">Niche & Luxury</span>
      </a>
    </div>

    <div class="header-actions">
      <div class="user-menu-container">
        <button 
          class="action-btn" 
          aria-label="User account"
          on:click={toggleUserMenu}
        >
          <Icon name="user" size="20" />
        </button>
        
        {#if userMenuOpen}
          <div class="user-dropdown">
            <button 
              class="close-btn" 
              on:click={closeUserMenu}
              aria-label="Close user menu"
            >
              <Icon name="close" size="16" />
            </button>
            <div class="user-info">
              <h4>Contact Information</h4>
              <p><strong>Website:</strong> <a href="https://daveymason.com" target="_blank" rel="noopener">daveymason.com</a></p>
              <p><strong>Email:</strong> <a href="mailto:daveymason@outlook.com">daveymason@outlook.com</a></p>
            </div>
          </div>
          <div 
            class="user-dropdown-backdrop" 
            on:click={closeUserMenu}
            on:keydown={(e) => e.key === 'Escape' && closeUserMenu()}
            role="button"
            tabindex="0"
            aria-label="Close user menu"
          ></div>
        {/if}
      </div>
    </div>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-soft);
  }

  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  .logo-section {
    flex-shrink: 0;
  }

  .logo {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--color-primary);
    transition: var(--transition-smooth);
  }

  .logo:hover {
    transform: scale(1.02);
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-primary), var(--color-gold-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .logo-tagline {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--color-text-light);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .action-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 12px;
    background: transparent;
    color: var(--color-text);
    transition: var(--transition-smooth);
    cursor: pointer;
  }

  .action-btn:hover {
    background: var(--color-border-light);
    color: var(--color-primary);
    transform: translateY(-1px);
  }

  .user-menu-container {
    position: relative;
  }

  .user-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    box-shadow: var(--shadow-medium);
    padding: 1.5rem;
    min-width: 280px;
    z-index: 1001;
    animation: slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .close-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    border-radius: 6px;
    width: 1.75rem;
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-smooth);
    color: var(--color-text-light);
  }

  .close-btn:hover {
    background: rgba(0, 0, 0, 0.1);
    color: var(--color-text);
    transform: scale(1.05);
  }

  .user-dropdown-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: transparent;
  }

  .user-info h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .user-info p {
    margin: 0.5rem 0;
    font-size: 0.875rem;
    color: var(--color-text-light);
  }

  .user-info a {
    color: var(--color-primary);
    text-decoration: none;
    transition: var(--transition-smooth);
  }

  .user-info a:hover {
    color: var(--color-gold);
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .header-container {
      padding: 0 1rem;
    }

    .header-actions {
      gap: 0.5rem;
    }

    .action-btn {
      width: 2.25rem;
      height: 2.25rem;
    }

    .logo-text {
      font-size: 1.25rem;
    }

    .logo-tagline {
      font-size: 0.625rem;
    }
  }

  /* Had some issues on displays with less pixels */
  @media (max-resolution: 150dpi), (max-device-pixel-ratio: 1.5) {
    .header {
      border-bottom-width: 1.5px;
    }

    .action-btn:hover {
      border-width: 1.5px;
    }
  }
</style>
