export async function load({ fetch }) {
  try {
    const response = await fetch('/data_for_challange.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      products: data.products || []
    };
  } catch (error) {
    console.error('Failed to load products:', error);
    return {
      products: []
    };
  }
}