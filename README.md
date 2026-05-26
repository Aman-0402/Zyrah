# M. M. Attarwala — Luxury Custom Fragrances

Premium luxury fragrance brand website for **M. M. Attarwala**, Vadodara. Custom-made attars blended from the finest ingredients, crafted fresh just for you.

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React + Vite | 18 + 5 |
| Styling | Tailwind CSS | v4 (`@tailwindcss/vite`) |
| Animation | Framer Motion | v11 |
| Scroll Animation | GSAP + ScrollTrigger | v3 |
| Routing | React Router | v6 |
| Icons | Lucide React | latest |

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Cinematic hero, marquee strip, featured scents, brand philosophy |
| `/collections` | Collections | Filterable product grid, 12 fragrances across 4 categories |
| `/custom-fragrance` | Custom Fragrance | 5-step guided blend builder with WhatsApp submission |
| `/about` | About | Brand story, heritage band, process timeline, values, founder note |
| `/contact` | Contact | Background image hero, glassmorphism form, info cards, bottom CTA |
| `*` | 404 | Watermark, animated headline, CTA buttons |

---

## Features

### Home
- **Cinematic hero** — split layout, GSAP ambient orbs, FM stagger headline reveal, dual CTA
- **Marquee strip** — infinite CSS ticker (`translate` compositor-only), hover-pause
- **Featured scents** — 3 cards with GSAP ScrollTrigger stagger, mobile tap-to-hover, gold-filled CTA button
- **Brand philosophy** — 2-col layout, rotating gold ornament, GSAP side-slide reveals

### Collections
- **Hero** — CollectionsHero with arabesque SVG, FM stagger
- **Filter tabs** — sticky glassmorphism bar, `layoutId` pill slide, product count badges
- **Product grid** — `AnimatePresence` popLayout transitions, 1-col mobile / 2-col sm / 3-col lg
- **CollectionCard** — 3D tilt (rotateX/Y springs), cursor parallax layers, bottle glow, shine sweep, mobile tap activation, `4:3` / `16:9` aspect ratio on mobile

### Custom Fragrance Builder
- 5-step builder: Family → Notes → Intensity → Name → Enquiry
- Step indicator with animated fill track + completion marks
- CSS SVG bottle preview with live label + animated fill
- WhatsApp deep-link submission with `+91 97245 86101`

### About
- Oversized `Our Story.` hero, stats (500+ Blends / 100% Custom)
- Full-width heritage band with clipPath GSAP reveal
- 3 alternating story blocks with side-slide reveals + CSS ornaments
- 4-step process timeline (horizontal desktop / vertical mobile)
- Values grid (3 cards, GSAP stagger, hover bottom-line reveal)
- Founder note with word-by-word Framer Motion quote reveal

### Contact
- Background image hero (`contactbackground.png`) — `82vh`, cinematic scrim layers
- Glassmorphism form — `backdrop-filter: blur(12px)`, animated gold underline on focus, subject chips, shimmer CTA
- Info cards — WhatsApp, Phone, Email, Address, Hours, Products list
- Bottom CTA strip — "A fragrance crafted only for you"

### Layout
- **Navbar** — Black Gold White premium design, `backdrop-blur`, gold micro-line, scrolled state transitions, mobile full-screen overlay
- **Footer** — Quote section with breathing room, 3-col grid (2-col nav on mobile), social icons, gold `◆` separator
- **RouteScrollToTop** — auto scroll-to-top on every route change

---

## Design System

### Colors (`src/styles/globals.css` `@theme`)

| Token | Class | Hex | Usage |
|---|---|---|---|
| `gold-300` | `text-gold-300` | `#E2C27D` | Hover states, light accents |
| `gold-400` | `text-gold-400` | `#C9A84C` | Primary gold — CTAs, active, borders |
| `gold-500` | `text-gold-500` | `#A8862E` | Scrollbar, deep gradients |
| `gold-600` | `text-gold-600` | `#8A6D1E` | Pressed/darkest gold |
| `ivory` | `text-ivory` | `#F5F0E8` | Primary body text |
| `black` | `bg-black` | `#0A0A0A` | Background |

### Base Background
```
body: #090605
luxury-page: radial warm glows + linear-gradient(#0a0705 → #0c0806)
luxury-section::before: rgba(9,6,5, 0.80–0.82) — semi-transparent overlay
luxury-section-alt::before: rgba(9,6,5, 0.80–0.82) — same base, red tint glows
```

### Typography

| Role | Font | Weight |
|---|---|---|
| Display / Hero | Cormorant Garamond | 300 italic |
| Headings | Cormorant Garamond | 400–500 |
| Body | Inter | 300–400 |
| UI Labels | Inter | 400–600 |
| Micro tracking | Inter uppercase | 400, tracking `0.3em+` |

### Easing

```js
const LUXURY = [0.22, 1, 0.36, 1]        // smooth reveal
const CINEMATIC = [0.76, 0, 0.24, 1]      // card/stagger entrance
const SPRING = { stiffness: 180, damping: 28, mass: 0.8 } // 3D card tilt
```

### Container
```css
.cx { max-width: 1440px; padding: 0 1.5rem; margin: auto; }
```

---

## Project Structure

```
Zyrah/
├── public/
│   ├── logoakatar.png           # Brand logo
│   ├── contactbackground.png    # Contact hero background image
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.jsx      # Full-screen cinematic hero
│   │   │   ├── MarqueeStrip.jsx     # Infinite scrolling ticker
│   │   │   ├── FeaturedSection.jsx  # 3 fragrance cards + GSAP stagger + gold CTA
│   │   │   └── BrandEthos.jsx       # Philosophy, 2-col, rotating ornament
│   │   ├── collections/
│   │   │   ├── CollectionsHero.jsx  # Collections page hero
│   │   │   ├── FilterTabs.jsx       # Sticky filter pills with count badges
│   │   │   ├── ProductGrid.jsx      # Responsive grid + AnimatePresence
│   │   │   └── CollectionCard.jsx   # 3D tilt card with cursor parallax
│   │   ├── fragrance/
│   │   │   ├── FragranceBuilderHero.jsx
│   │   │   ├── StepIndicator.jsx
│   │   │   ├── BottlePreview.jsx
│   │   │   ├── Step1Family.jsx
│   │   │   ├── Step2Notes.jsx
│   │   │   ├── Step3Intensity.jsx
│   │   │   ├── Step4Name.jsx
│   │   │   └── Step5Enquiry.jsx
│   │   ├── about/
│   │   │   ├── AboutHero.jsx        # "Our Story." oversized headline + stats
│   │   │   ├── HeritageBand.jsx
│   │   │   ├── OurStory.jsx
│   │   │   ├── ProcessTimeline.jsx
│   │   │   ├── ValuesGrid.jsx
│   │   │   └── FounderNote.jsx
│   │   ├── contact/
│   │   │   ├── ContactHero.jsx      # Background image hero, 82vh
│   │   │   ├── ContactForm.jsx      # Glassmorphism form + chips
│   │   │   └── ContactInfo.jsx      # Cards: WA, phone, email, address, hours
│   │   ├── layout/
│   │   │   ├── Navbar.jsx           # Black Gold White, blur, mobile overlay
│   │   │   ├── Footer.jsx           # 3-col, quote, social, gold separator
│   │   │   └── RouteScrollToTop.jsx # Scroll reset on route change
│   │   └── ui/
│   │       └── Button.jsx           # primary / outline / ghost variants
│   ├── data/
│   │   ├── products.js              # 12 products, 4 categories, CATEGORIES array
│   │   └── notes.js                 # FAMILIES, NOTE_OPTIONS, INTENSITY_LEVELS
│   ├── hooks/
│   │   ├── useGSAPReveal.js         # useGSAPReveal + useGSAPStaggerReveal
│   │   └── useScrollPosition.js     # scrollY + isScrolled (threshold 50px)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Collections.jsx
│   │   ├── CustomFragrance.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── globals.css              # @theme tokens, base styles, .cx, .luxury-* utilities
│   ├── App.jsx                      # Router + AnimatePresence + RouteScrollToTop
│   └── main.jsx                     # React root mount
├── AGENT.md                         # AI agent reference + architecture notes
├── index.html                       # OG meta, Google Fonts preconnect
├── package.json
└── vite.config.js                   # react plugin + tailwind plugin + manual chunks
```

---

## Getting Started

```bash
# Install
npm install

# Dev server → localhost:5173
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Business Details

| Field | Value |
|---|---|
| Brand | M. M. Attarwala |
| WhatsApp (M. Roeesh) | +91 97245 86101 |
| Phone (M. Munavvar) | +91 90163 61538 |
| Email | mmattarwala2008@rediff.com |
| Store 1 | GF 154/155 Nazarbaug Palace, Vadodara |
| Store 2 | Shop No. 3 Fortune Point, Mandvi, Vadodara – 390 017 |
| Hours | 10 am – 8 pm · Mon closed · Fri closed 12:45–2:45 pm |
| Instagram | @mm_attarwala |

---

## License

Private project — all rights reserved. Not for redistribution.
