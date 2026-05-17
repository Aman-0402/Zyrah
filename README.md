# m_m_attarwala — Luxury Custom Fragrances

A premium fragrance brand website built with React + Vite. Custom-made attars blended from the finest ingredients, free delivery across India.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v11 + GSAP 3 |
| 3D | React Three Fiber v8 + Drei + Three.js |
| Routing | React Router v6 |
| Icons | Lucide React |

---

## Features

- **Split cinematic hero** — 3D procedural perfume bottle (LatheGeometry, glass material, gold cap) with mouse parallax and auto-rotation
- **Collections page** — filterable product grid with AnimatePresence layout transitions
- **Custom Fragrance Builder** — 5-step guided builder (family → notes → intensity → name → enquiry), WhatsApp deep-link submission
- **About page** — brand story, process timeline, values grid
- **Contact page** — subject chips, WhatsApp CTA, form validation
- **Footer** — 3-col layout, nav links, social icons
- **Mobile responsive** — 3D canvas lazy-loaded only on desktop, SVG fallback on mobile
- **Performance** — code-split vendor chunks (React / Motion / GSAP / Three.js / R3F), adaptive `dpr`, `performance.min = 0.5`

---

## Design System

| Token | Value |
|---|---|
| Gold 400 | `#C9A84C` |
| Gold 300 | `#E2C27D` |
| Ivory | `#F5F0E8` |
| Black | `#0A0A0A` |
| Brown | `#3B1F0F` |
| Heading font | Cormorant Garamond |
| Body font | Inter |
| Luxury ease | `[0.76, 0, 0.24, 1]` |
| Container width | 1440px (`.cx` utility) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── hero/          # 3D bottle canvas + R3F scene
│   ├── home/          # HeroSection, FeaturedSection, BrandEthos, MarqueeStrip
│   ├── collections/   # FilterTabs, ProductGrid
│   ├── fragrance/     # BottlePreview, step components (1–5)
│   ├── about/         # OurStory, ProcessTimeline, ValuesGrid
│   ├── contact/       # ContactForm, ContactInfo
│   ├── layout/        # Navbar, Footer, ScrollToTop
│   └── ui/            # Button
├── data/
│   ├── products.js    # 12 products across 4 categories
│   └── notes.js       # Fragrance families, notes, intensity levels
├── hooks/
│   ├── useGSAPReveal.js     # ScrollTrigger reveal + stagger hooks
│   └── useScrollPosition.js # Scroll depth + isScrolled flag
├── pages/
│   ├── Home.jsx
│   ├── Collections.jsx
│   ├── CustomFragrance.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
└── styles/
    └── globals.css    # @theme tokens, .cx container, base styles
```

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, marquee, featured scents, brand philosophy |
| `/collections` | All 12 fragrances with category filter |
| `/custom-fragrance` | 5-step custom blend builder |
| `/about` | Brand story, crafting process, values |
| `/contact` | Contact form + WhatsApp CTA |

---

## License

Private project — all rights reserved. Not for redistribution.
