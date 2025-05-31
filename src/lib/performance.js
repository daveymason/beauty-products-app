// Performance monitoring utilities
export function measureLCP() {
  if ('web-vitals' in window) {
    return;
  }
  
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

export function measureCLS() {
  let clsValue = 0;
  let clsEntries = [];

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    }
    console.log('CLS:', clsValue);
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

export function measureFID() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime);
    }
  });

  observer.observe({ entryTypes: ['first-input'] });
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    measureLCP();
    measureCLS();
    measureFID();
  });
}
