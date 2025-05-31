<svelte:head>
	<title>B-Futurist | Premium Beauty Products</title>
	<meta name="description" content="Discover premium beauty products and exclusive collections at B-Futurist. Shop luxury fragrances, skincare, and cosmetics.">
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://flourishing-biscotti-c23ea6.netlify.app">
	<meta property="og:title" content="B-Futurist | Premium Beauty Products">
	<meta property="og:description" content="Discover premium beauty products and exclusive collections at B-Futurist. Shop luxury fragrances, skincare, and cosmetics.">
	<meta property="og:image" content="https://flourishing-biscotti-c23ea6.netlify.app/android-chrome-512x512.png">
	<meta property="og:image:width" content="512">
	<meta property="og:image:height" content="512">
	<meta property="og:site_name" content="B-Futurist">
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:url" content="https://flourishing-biscotti-c23ea6.netlify.app">
	<meta name="twitter:title" content="B-Futurist | Premium Beauty Products">
	<meta name="twitter:description" content="Discover premium beauty products and exclusive collections at B-Futurist. Shop luxury fragrances, skincare, and cosmetics.">
	<meta name="twitter:image" content="https://flourishing-biscotti-c23ea6.netlify.app/android-chrome-512x512.png">
	
	<!-- Additional SEO -->
	<link rel="canonical" href="https://flourishing-biscotti-c23ea6.netlify.app">
	<meta name="robots" content="index, follow">
	<meta name="author" content="B-Futurist">
	<link rel="preload" href="/beautynow.gif" as="image">
</svelte:head>

<div class="page-container">
	<div class="hero-section">
		<img 
			src="/beautynow.gif" 
			alt="Beauty Now - Premium Beauty Products" 
			class="hero-gif"
			loading="eager"
			decoding="async"
		/>
	</div>

	<div class="cta-section">
		<a href="/products" class="products-btn">
			View Products
		</a>
	</div>
</div>

<style>
	.page-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		min-height: 80vh;
		justify-content: center;
	}

	.hero-section {
		text-align: center;
	}

	.hero-gif {
		max-width: 100%;
		height: auto;
		border-radius: 12px;
		box-shadow: var(--shadow-premium);
		transition: var(--transition-smooth);
	}

	.hero-gif:hover {
		transform: scale(1.02);
		box-shadow: var(--shadow-gold);
	}

	.cta-section {
		text-align: center;
	}

	.products-btn {
		display: inline-block;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold));
		color: var(--color-primary);
		text-decoration: none;
		border-radius: 12px;
		font-weight: 600;
		font-size: 1.1rem;
		transition: var(--transition-smooth);
		box-shadow: var(--shadow-soft);
		border: 1px solid var(--color-gold);
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.products-btn:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-gold);
		background: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
		color: white;
	}

	.products-btn:active {
		transform: translateY(-1px);
		transition: var(--transition-bounce);
	}

	@media (max-width: 768px) {
		.page-container {
			padding: 1rem;
			gap: 2rem;
		}

		.hero-section {
			padding: 1.5rem;
		}

		.products-btn {
			padding: 0.875rem 1.5rem;
			font-size: 1rem;
		}
	}
</style> 