# AGENT.md — M. M. Attarwala Project Reference

> Master reference for AI agents. Reflects current production state.

---

## 1. Project Overview

| Field | Value |
|---|---|
| Brand | M. M. Attarwala |
| Tagline | Custom-made fragrances, crafted just for you |
| Type | Luxury attar / perfume brand website |
| Goal | Cinematic, premium frontend — Arabic attar meets modern luxury |
| Status | **ALL PHASES COMPLETE** — in active polish/improvement |

---

## 2. Real Business Details

| Field | Value |
|---|---|
| WhatsApp (M. Roeesh) | `919724586101` |
| Phone (M. Munavvar) | `919016361538` |
| Email | `mmattarwala2008@rediff.com` |
| Store 1 | GF 154/155 Nazarbaug Palace, Vadodara |
| Store 2 | Shop No. 3 Fortune Point, Mandvi, Vadodara – 390 017 |
| Hours | 10 am – 8 pm · Mon closed · Fri closed 12:45–2:45 pm |
| Instagram | `@mm_attarwala` |
| Facebook | `mmattarwala` |

---

## 3. Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React + Vite | 18 + 5 |
| Styling | Tailwind CSS | v4 (`@tailwindcss/vite`, no config file) |
| Animation | Framer Motion | v11 |
| Scroll Animation | GSAP + ScrollTrigger | v3 |
| Routing | React Router | v6 |
| Icons | Lucide React | latest |

---

## 4. File Architecture

```
Zyrah/
├── public/
│   ├── logoakatar.png              # Brand logo (used in Navbar + Footer)
│   ├── contactbackground.png       # Contact hero full-bleed background
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.jsx         # Cinematic hero, GSAP orbs, FM stagger
│   │   │   ├── MarqueeStrip.jsx        # Infinite ticker, hover-pause
│   │   │   ├── FeaturedSection.jsx     # 3 cards, GSAP stagger, mobile tap, gold CTA
│   │   │   └── BrandEthos.jsx          # Philosophy, 2-col, rotating ornament
│   │   ├── collections/
│   │   │   ├── CollectionsHero.jsx     # Hero with arabesque SVG divider
│   │   │   ├── FilterTabs.jsx          # Sticky glass pills, layoutId slide, counts
│   │   │   ├── ProductGrid.jsx         # 1/2/3 col responsive, AnimatePresence
│   │   │   └── CollectionCard.jsx      # 3D tilt card, cursor parallax, shine sweep
│   │   ├── fragrance/
│   │   │   ├── FragranceBuilderHero.jsx
│   │   │   ├── StepIndicator.jsx       # 5-step fill track + completion marks
│   │   │   ├── BottlePreview.jsx       # CSS SVG bottle, animated fill
│   │   │   ├── Step1Family.jsx
│   │   │   ├── Step2Notes.jsx
│   │   │   ├── Step3Intensity.jsx
│   │   │   ├── Step4Name.jsx
│   │   │   └── Step5Enquiry.jsx        # WhatsApp deep-link submission
│   │   ├── about/
│   │   │   ├── AboutHero.jsx           # "Our Story." hero, stats, no breadcrumb
│   │   │   ├── HeritageBand.jsx        # Full-width clipPath GSAP reveal
│   │   │   ├── OurStory.jsx            # 3 alternating blocks, CSS ornaments
│   │   │   ├── ProcessTimeline.jsx     # 4 steps, horizontal/vertical responsive
│   │   │   ├── ValuesGrid.jsx          # 3 cards, GSAP stagger
│   │   │   └── FounderNote.jsx         # Word-by-word FM quote reveal
│   │   ├── contact/
│   │   │   ├── ContactHero.jsx         # BG image hero, 82vh, scrim layers
│   │   │   ├── ContactForm.jsx         # Glassmorphism, chips, shimmer CTA
│   │   │   └── ContactInfo.jsx         # WA/phone/email/address/hours/products
│   │   ├── layout/
│   │   │   ├── Navbar.jsx              # Black Gold White, blur, mobile overlay
│   │   │   ├── Footer.jsx              # Quote, 3-col (2-col nav on mobile), social
│   │   │   └── RouteScrollToTop.jsx    # useLocation → window.scrollTo(0,0)
│   │   └── ui/
│   │       └── Button.jsx              # primary / outline / ghost variants
│   ├── data/
│   │   ├── products.js                 # 12 products, 4 categories, CATEGORIES array
│   │   └── notes.js                    # FAMILIES, NOTE_OPTIONS, INTENSITY_LEVELS
│   ├── hooks/
│   │   ├── useGSAPReveal.js            # useGSAPReveal + useGSAPStaggerReveal
│   │   └── useScrollPosition.js        # scrollY + isScrolled (threshold 50px)
│   ├── pages/
│   │   ├── Home.jsx                    # 4 sections + atmospheric bridge divs
│   │   ├── Collections.jsx
│   │   ├── CustomFragrance.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx                 # 2-col layout + BottomCTA strip
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── globals.css                 # @theme tokens, base, .cx, .luxury-* utils
│   ├── App.jsx                         # Router + AnimatePresence + RouteScrollToTop
│   └── main.jsx
├── AGENT.md                            # THIS FILE
├── README.md
├── index.html                          # OG meta, Google Fonts preconnect
├── package.json
└── vite.config.js                      # manual chunks: react/motion/gsap
```

---

## 5. Design System

### Color Tokens (`globals.css @theme`)

| Token | Hex | Usage |
|---|---|---|
| `gold-300` | `#E2C27D` | Hover states, light gold |
| `gold-400` | `#C9A84C` | Primary gold — CTAs, active, borders |
| `gold-500` | `#A8862E` | Deep gold, gradients |
| `gold-600` | `#8A6D1E` | Darkest gold, pressed states |
| `ivory` | `#F5F0E8` | Primary text |
| `black` | `#0A0A0A` | Background base |

### Background System (unified)

All sections use a shared base so no visible seams between sections:

```
body:                    #090605  (solid base)
.luxury-page:            radial warm glows + linear #0a0705→#0c0806
.luxury-section::before: rgba(9,6,5, 0.80–0.82) semi-transparent overlay
.luxury-section-alt::before: same opacity, different tint glows
```

**Rule:** never use near-opaque (0.95+) section backgrounds. Keep at 0.75–0.85 so the page-level gradient unifies all sections.

### Typography

| Role | Font | Weight |
|---|---|---|
| Display/Hero | Cormorant Garamond | 300 italic |
| Headings | Cormorant Garamond | 400 |
| Italic accent | Cormorant Garamond Italic | 300–400 |
| Body | Inter | 300–400 |
| UI / Labels | Inter | 500–600 |
| Micro tracking | Inter uppercase | 400, `tracking-[0.3em+]` |

### Easing

```js
const LUXURY   = [0.22, 1, 0.36, 1]       // smooth luxury reveals
const CINEMATIC = [0.76, 0, 0.24, 1]      // fast-in slow-out card/stagger
const SPRING   = { stiffness: 180, damping: 28, mass: 0.8 } // 3D card tilt
```

### Container

```css
.cx { max-width: 1440px; padding: 0 1.5rem; margin: auto; }
```

### Section Padding Pattern

Navbar clearance via section-level clamp (not inner padding):
```jsx
style={{ paddingTop: 'clamp(96px, 10vw, 130px)' }}  // hero sections
style={{ paddingTop: 'clamp(100px, 11vw, 140px)' }}  // contact/about heroes
```

---

## 6. Animation Patterns

### Libraries
- **Framer Motion** — component animations, hover, page transitions, variants
- **GSAP + ScrollTrigger** — scroll-triggered reveals, stagger on scroll

### GSAP Hooks (`src/hooks/useGSAPReveal.js`)

```js
// Single element reveal
const ref = useGSAPReveal({
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  duration: 0.9,          // default
  start: 'top 82%',       // default
})

// Stagger children (attach to container, children need [data-reveal])
const ref = useGSAPStaggerReveal({
  selector: '[data-reveal]',
  from: { opacity: 0, y: 20, scale: 0.96 },
  to: { opacity: 1, y: 0, scale: 1 },
  stagger: 0.13,
  start: 'top 80%',
})
```

### Framer Motion Patterns

| Pattern | Implementation |
|---|---|
| Page entrance | `initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}` |
| Hero text reveal | `initial={{ y:'110%', opacity:0 }} animate={{ y:0, opacity:1 }}` |
| Shine sweep | `shineKey` state increments on hover → AnimatePresence remount → `left: -38%→138%` |
| Layout filter | `AnimatePresence mode="popLayout"` in ProductGrid |
| Active pill slide | `layoutId="filterActive"` on FilterTabs active indicator |

---

## 7. CollectionCard — 3D Hover Architecture

**File:** `src/components/collections/CollectionCard.jsx`

### Motion Value Layer Stack (image area, z-order)

| Z | Layer | Motion |
|---|---|---|
| 0 | BG gradient (inset -8%) | `bgX/bgY` spring — moves opposite cursor |
| 1 | Arabic watermark | Same `bgX/bgY`, fades on hover |
| 2 | Bottle/image | Cursor `bottleX/Y` amplified |
| 3 | Dynamic cursor glow | `glowLeft/glowTop` string motion values |
| 20 | Glass shine sweep | AnimatePresence keyed on `shineKey` |

### Key Motion Values
```js
rawX, rawY       // onMouseMove → normalized -0.5 to +0.5
rotateX, rotateY // card tilt (disabled on mobile)
bgX, bgY         // parallax × 7, opposite cursor
bottleX, bottleY // parallax × 13/9, same as cursor
glowLeft, glowTop // '15%'→'85%' follows cursor
cardShadow       // [rawX, rawY] combined transform → box-shadow string
```

### Mobile Behavior
- `isMobile` detected via `window.matchMedia('(max-width: 639px)')`
- Mobile: no 3D tilt, no mouse parallax
- Mobile: tap card → toggle `touchActive` → triggers hover visual state
- Image area: `aspectRatio: featured ? '16/9' : '4/3'` (not fixed height)
- Desktop: fixed heights (`featured: 360px`, `bestseller: 310px`, default: `268px`)

---

## 8. Routing & Navigation

```
/                   → Home.jsx
/collections        → Collections.jsx
/custom-fragrance   → CustomFragrance.jsx
/about              → About.jsx
/contact            → Contact.jsx
*                   → NotFound.jsx
```

- `BrowserRouter` in `main.jsx`
- `AnimatePresence mode="wait"` + `key={location.pathname}` in `App.jsx`
- `RouteScrollToTop` fires `window.scrollTo(0,0)` on every pathname change
- `NavLink` with `end` prop on `/` for exact active matching
- Navbar closes mobile menu on route change

---

## 9. Component Rules

- All components: functional, hooks-based
- Props: destructured with defaults in function signature
- No class components
- Import order: React → third-party → local hooks → local components
- No `index.js` barrel files — import directly by filename
- Inline styles: only for dynamic values. Prefer Tailwind for static

---

## 10. Responsive Rules

| Breakpoint | Prefix | Key behaviors |
|---|---|---|
| Default | (none) | 1-col, hamburger menu, stacked layout |
| `sm` (640px) | `sm:` | 2-col product grid, show some desktop patterns |
| `md` (768px) | `md:` | Desktop nav, 3-col footer, 2-col contact layout |
| `lg` (1024px) | `lg:` | 3-col product grid, wider paddings |

Mobile-first always. Use `clamp()` for fluid font/spacing. Never desktop-first media queries.

---

## 11. Completed Improvements Log

### Navigation & UX
- [x] `RouteScrollToTop` — scroll reset on every route change
- [x] Navbar — Black Gold White premium redesign, gold micro-lines, blur transitions
- [x] Navbar — CTA button gold-filled with `fontWeight: 600` on hover

### Home Page
- [x] HeroSection — `paddingTop: clamp(96px,10vw,130px)` navbar clearance fix
- [x] FeaturedSection — mobile tap-to-hover (activeId state, touchActive toggle)
- [x] FeaturedSection CTA — gold-filled button with shimmer sweep, `mt-16 md:mt-20`, GSAP reveal
- [x] MarqueeStrip — background unified to `rgba(9,6,5,0.75)`, fade color `#090605`
- [x] Home atmospheric bridge divs — all colors unified to `rgba(9,6,5,...)`

### Collections
- [x] ProductGrid — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, removed mobile stagger offset
- [x] CollectionCard mobile — image uses `aspectRatio: '4/3'` (featured: `16/9`), not fixed height
- [x] CollectionCard — desc, notes, "Handcrafted · Pure Essence" label always visible (no `hidden sm:*`)
- [x] CollectionCard price — split format: `₹799 · 30ml` (was `₹799 for 30ml`)

### About Page
- [x] AboutHero — oversized one-line headline `clamp(56px,11vw,180px)`, no breadcrumb
- [x] AboutHero — `75vh justify-center` (was `92vh justify-end` causing huge empty space)
- [x] AboutHero background unified to `#090605` family

### Contact Page
- [x] ContactHero — full rewrite: `contactbackground.png` BG, `82vh`, scrim layers, animated eyebrow
- [x] ContactHero — scrim lightened so background image shows: base `rgba(5,3,2,0.10)`
- [x] ContactForm — glassmorphism `backdrop-filter: blur(12px)`, animated gold underline on focus
- [x] ContactForm — subject chips (pill shape), shimmer CTA with Send icon
- [x] ContactInfo — icon circles `w-12 h-12`, cards with `borderRadius: 4px`, products pill tags
- [x] Contact BottomCTA — "A fragrance crafted only for you" headline, gold-filled primary CTA

### Footer
- [x] Footer background `#050302`
- [x] Footer quote — wrapped in `py-16 md:py-24`, gold `◆` separator with `mb-16 md:mb-20`
- [x] Footer mobile — nav links `grid grid-cols-2` (was single column text wall), `gap-10`

### Background Unification (no section seams)
- [x] `globals.css` `.luxury-section::before` — opacity reduced `0.96/0.98 → 0.80/0.82`
- [x] `globals.css` `.luxury-section-alt::before` — opacity reduced `0.98/0.96 → 0.82/0.80`
- [x] `globals.css` `.luxury-page` — gradient simplified, removed mid-stop causing lighter band
- [x] `BrandEthos` explicit overlay — removed double-darkening, replaced with `rgba(9,6,5,0.22)`

---

## 12. Key Patterns for Future Agents

### Adding a new page
1. Create `src/pages/NewPage.jsx` with `motion.main` wrapper (opacity 0→1 entrance)
2. Add route in `App.jsx`
3. Add link to `Navbar.jsx` NAV_LINKS array and `Footer.jsx` NAV_LINKS array
4. Use `paddingTop: 'clamp(100px, 11vw, 140px)'` on hero section for navbar clearance

### Adding a product image
1. Put PNG/WebP in `public/images/`
2. Reference in `products.js`: `image: `${import.meta.env.BASE_URL}images/filename.jpg``
3. `CollectionCard` checks `image` prop — renders `<img>` or `<BottlePlaceholder>`

### Using GSAP reveal
```jsx
import { useGSAPReveal, useGSAPStaggerReveal } from '../../hooks/useGSAPReveal'

const ref = useGSAPReveal({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } })
// attach: <div ref={ref}>

const containerRef = useGSAPStaggerReveal({ selector: '[data-reveal]', stagger: 0.13 })
// children need data-reveal attribute
```

### Tailwind v4 notes
- Config entirely in `src/styles/globals.css` via `@theme {}`. No `tailwind.config.js`.
- Color tokens: `--color-gold-400` → generates `bg-gold-400`, `text-gold-400`, `border-gold-400`
- Opacity modifier: `text-gold-400/60`, `border-gold-400/15`
- `font-heading` → Cormorant Garamond. `font-body` → Inter (default on `body`).

### Background rule
Never set section background opacity above `0.85`. Keep sections semi-transparent so the `.luxury-page` gradient unifies the whole page. Visible seams appear when sections are `0.95+` opaque.

### BASE_URL
Always use `import.meta.env.BASE_URL` prefix for public assets:
```js
const BASE = import.meta.env.BASE_URL
// usage: `${BASE}logoakatar.png`
```

---

## 13. Commands

```bash
npm run dev      # localhost:5173
npm run build    # production build
npm run preview  # preview production build
```

Build verified clean. No size warnings (manual chunks configured in `vite.config.js`).
