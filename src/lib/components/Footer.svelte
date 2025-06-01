<script>
  import Icon from './Icon.svelte';
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-left">
        <div class="footer-logo">
          <span class="logo-text">Perfumenow</span>
          <span class="logo-tagline">Niche & Luxury</span>
        </div>
        <p class="copyright">© Perfumenow. All rights reserved.</p>
      </div>
      
      <div class="footer-right">
        <div class="brand-cards">
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/1-5.webp" alt="Brand 1" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/3-5.webp" alt="Brand 2" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/4-4.webp" alt="Brand 3" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/5-3.webp" alt="Brand 4" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/2-7.webp" alt="Brand 5" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/6-1.webp" alt="Brand 6" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/8.webp" alt="Brand 7" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/7.webp" alt="Brand 8" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/10.webp" alt="Brand 9" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/9.webp" alt="Brand 10" class="brand-card" />
          <img src="https://cdn4.beautinow.com/wp-content/uploads/2024/02/11.webp" alt="Brand 11" class="brand-card" />
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: linear-gradient(135deg, var(--color-primary), #1a1a1a);
    color: #e5e7eb;
    margin-top: auto;
  }

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-gold), var(--color-gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .logo-tagline {
    font-size: 0.75rem;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .copyright {
    color: #9ca3af;
    font-size: 0.875rem;
    margin: 0;
  }

  .footer-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .brand-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 0.5rem;
    max-width: 500px;
  }

  .brand-card {
    max-width: 60px;
    max-height: 40px;
    object-fit: contain;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25rem;
    transition: transform 0.2s ease;
  }

  .brand-card:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
      padding: 1.5rem 0;
    }

    .footer-left,
    .footer-right {
      align-items: center;
      justify-content: center;
    }

    .brand-cards {
      max-width: 400px;
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .brand-cards {
      max-width: 300px;
      grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
      gap: 0.25rem;
    }

    .brand-card {
      max-width: 45px;
      max-height: 30px;
      padding: 0.125rem;
    }
  }
</style>
