export const NOTES = {
  oud: {
    top:    ['Saffron', 'Black Pepper', 'Cardamom', 'Bergamot', 'Incense', 'Elemi'],
    middle: ['Oud', 'Rose', 'Leather', 'Patchouli', 'Myrrh', 'Labdanum'],
    base:   ['Amber', 'Musk', 'Sandalwood', 'Vetiver', 'Benzoin', 'Civet'],
  },
  floral: {
    top:    ['Bergamot', 'Lemon', 'Green Leaves', 'Aldehydes', 'Peach', 'Raspberry'],
    middle: ['Rose', 'Jasmine', 'Tuberose', 'Ylang Ylang', 'Peony', 'Iris'],
    base:   ['Sandalwood', 'Musk', 'Amber', 'Vetiver', 'Patchouli', 'Cedarwood'],
  },
  musk: {
    top:    ['Bergamot', 'Lemon', 'White Tea', 'Grapefruit', 'Lavender', 'Mint'],
    middle: ['White Musk', 'Jasmine', 'Orris', 'Violet', 'Lily', 'Magnolia'],
    base:   ['Amber', 'Sandalwood', 'Vanilla', 'Tonka Bean', 'Cashmere', 'Driftwood'],
  },
  fresh: {
    top:    ['Citrus', 'Sea Salt', 'Grapefruit', 'Mint', 'Green Tea', 'Petrichor'],
    middle: ['Lavender', 'Cardamom', 'Geranium', 'Neroli', 'Aquatics', 'Herbs'],
    base:   ['Cedarwood', 'Vetiver', 'Driftwood', 'Musk', 'Moss', 'Ambergris'],
  },
}

export const FAMILIES = [
  {
    id: 'oud',
    label: 'Oud',
    arabicLabel: 'عود',
    desc: 'Deep, smoky, ancient. The king of Arabian perfumery.',
    gradient: 'linear-gradient(135deg, #1a0a05 0%, #2d1507 100%)',
    accentColor: '#C9A84C',
    glowColor: 'rgba(201,168,76,0.15)',
  },
  {
    id: 'floral',
    label: 'Floral',
    arabicLabel: 'زهور',
    desc: 'Blooming petals, velvety and romantic. Nature at its finest.',
    gradient: 'linear-gradient(135deg, #1f0a10 0%, #3a1020 100%)',
    accentColor: '#E2C27D',
    glowColor: 'rgba(226,194,125,0.12)',
  },
  {
    id: 'musk',
    label: 'Musk',
    arabicLabel: 'مسك',
    desc: 'Clean, celestial, long-lasting. A second skin.',
    gradient: 'linear-gradient(135deg, #0d0d12 0%, #141424 100%)',
    accentColor: '#F5F0E8',
    glowColor: 'rgba(245,240,232,0.08)',
  },
  {
    id: 'fresh',
    label: 'Fresh',
    arabicLabel: 'نضارة',
    desc: 'Bright, airy, invigorating. Morning light in a bottle.',
    gradient: 'linear-gradient(135deg, #0a120a 0%, #0f1f10 100%)',
    accentColor: '#C9A84C',
    glowColor: 'rgba(201,168,76,0.10)',
  },
]

export const INTENSITY_LEVELS = [
  { value: 1, label: 'Whisper', desc: 'Barely-there — intimate, close to skin.' },
  { value: 2, label: 'Soft',    desc: 'Subtle elegance — gentle and understated.' },
  { value: 3, label: 'Balanced', desc: 'Perfect harmony — noticed but never overwhelming.' },
  { value: 4, label: 'Bold',    desc: 'Confident and present — leaves an impression.' },
  { value: 5, label: 'Intense', desc: 'Powerful and unforgettable — a statement.' },
]
