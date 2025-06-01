export function createToggleFunction(currentArray, setter) {
  return (item) => {
    if (currentArray.includes(item)) {
      setter(currentArray.filter(x => x !== item));
    } else {
      setter([...currentArray, item]);
    }
  };
}

export function processProductName(name) {
  return name
    ?.replace('[Exclusively Whatsapp Internal Sales] ', '')
    .replace(/&amp;/g, '&') || name;
}

export function getGenderEmoji(gender) {
  switch(gender?.toLowerCase()) {
    case 'male': return '👨';
    case 'female': return '👩';
    case 'unisex': return '🧑';
    default: return null;
  }
}

export function getMinPrice(variations) {
  return Math.min(...(variations?.map(v => v.price) || [0]));
}


export function isExclusiveProduct(name) {
  return name?.includes('[Exclusively Whatsapp Internal Sales]') || false;
}


export function getFirstImageUrl(images) {
  return images?.[0]?.[0] || '';
}
