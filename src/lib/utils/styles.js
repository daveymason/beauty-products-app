export const accordColors = {
  amber: { bg: '#fef3e2', border: '#fbbf24', text: '#92400e' },
  aquatic: { bg: '#ecfeff', border: '#06b6d4', text: '#164e63' },
  aromatic: { bg: '#ecfdf5', border: '#10b981', text: '#064e3b' },
  balsamic: { bg: '#f3e8ff', border: '#8b5cf6', text: '#4c1d95' },
  cinnamon: { bg: '#fef2f2', border: '#dc2626', text: '#7f1d1d' },
  citrus: { bg: '#fefce8', border: '#eab308', text: '#a16207' },
  earthy: { bg: '#f7f6f3', border: '#a3a3a3', text: '#404040' },
  floral: { bg: '#fdf2f8', border: '#ec4899', text: '#831843' },
  fresh: { bg: '#f0fdfa', border: '#22d3ee', text: '#155e75' },
  'fresh spicy': { bg: '#ecfdf5', border: '#059669', text: '#064e3b' },
  fruity: { bg: '#fdf2f8', border: '#fb7185', text: '#881337' },
  green: { bg: '#f7fee7', border: '#84cc16', text: '#365314' },
  herbal: { bg: '#f0fdf4', border: '#22c55e', text: '#14532d' },
  iris: { bg: '#f5f3ff', border: '#a855f7', text: '#581c87' },
  lactonic: { bg: '#fffbeb', border: '#f59e0b', text: '#a16207' },
  leather: { bg: '#f5f5f4', border: '#78716c', text: '#292524' },
  marine: { bg: '#f0f9ff', border: '#0ea5e9', text: '#0c4a6e' },
  musky: { bg: '#f8fafc', border: '#64748b', text: '#334155' },
  oud: { bg: '#fafaf9', border: '#57534e', text: '#1c1917' },
  ozonic: { bg: '#f0f9ff', border: '#38bdf8', text: '#0369a1' },
  patchouli: { bg: '#f6f6f4', border: '#78716c', text: '#1c1917' },
  powdery: { bg: '#faf5ff', border: '#c084fc', text: '#6b21a8' },
  rose: { bg: '#fdf2f8', border: '#f472b6', text: '#9d174d' },
  smoky: { bg: '#f8fafc', border: '#475569', text: '#1e293b' },
  spicy: { bg: '#fef2f2', border: '#ef4444', text: '#7f1d1d' },
  sweet: { bg: '#fef7ff', border: '#f472b6', text: '#831843' },
  tobacco: { bg: '#f7f6f3', border: '#92400e', text: '#451a03' },
  tuberose: { bg: '#fffbeb', border: '#f59e0b', text: '#a16207' },
  vanilla: { bg: '#fffbeb', border: '#fbbf24', text: '#92400e' },
  'warm spicy': { bg: '#fef2f2', border: '#f97316', text: '#9a3412' },
  'white floral': { bg: '#fefefe', border: '#e5e7eb', text: '#374151' },
  woody: { bg: '#f7f6f3', border: '#92400e', text: '#451a03' }
};

export function getAccordStyle(accord) {
  const accordKey = accord.toLowerCase();
  const colors = accordColors[accordKey] || { 
    bg: 'var(--color-bg)', 
    border: 'var(--color-border)', 
    text: 'var(--color-text)' 
  };
  return `background: ${colors.bg}; border: 1px solid ${colors.border}; color: ${colors.text};`;
}
