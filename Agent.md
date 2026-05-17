# Agent.md — m_m_attarwala Project Memory
> Master reference for all AI agents. Update after every phase.

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| **Brand** | m_m_attarwala |
| **Tagline** | Custom-made fragrances, crafted just for you |
| **USP** | Free delivery across India |
| **Type** | Luxury perfume / attar e-commerce brand website |
| **Goal** | Cinematic, premium frontend — Arabic attar meets modern luxury |

---

## 2. Current Progress

**PHASE 1 — COMPLETE**

- [x] React + Vite scaffold (manual, not `create-vite` due to existing .git)
- [x] Tailwind CSS v4 via `@tailwindcss/vite` plugin
- [x] Luxury dark theme global styles
- [x] Custom font loading (Cormorant Garamond + Inter)
- [x] Custom scrollbar (gold on black)
- [x] useScrollPosition hook
- [x] Floating Navbar (transparent → blur on scroll)
- [x] Mobile menu (full-screen overlay, Framer Motion)
- [x] React Router v6 with AnimatePresence page transitions
- [x] Reusable Button component (3 variants)
- [x] 5 placeholder pages (Home, Collections, CustomFragrance, About, Contact)
- [x] Agent.md initialized

---

## 3. Completed Features

### Navbar
- Fixed position, z-50
- Initial state: transparent, py-5
- Scrolled state: glassmorphism (`backdrop-blur-16px`), border-b gold/10, py-3
- Scroll threshold: 50px (via `useScrollPosition` hook)
- Logo: `m_m_attarwala` in Cormorant Garamond gold, letter-spacing animates on hover
- Desktop links: 11px, tracking-widest, uppercase; gold animated underline (Framer Motion width 0→100%)
- Active route: gold text + full underline
- Desktop CTA button: "Craft Yours" — black text on gold-400 bg
- Mobile: hamburger/X toggle with spring rotation animation
- Mobile menu: full-screen overlay, `clipPath` reveal animation, staggered link entrance
- Mobile links: Cormorant Garamond 4xl–5xl, ivory → gold-300 on hover
- Body scroll locked when mobile menu open
- Menu closes on route change

### Button Component (`src/components/ui/Button.jsx`)
| Prop | Options | Default |
|------|---------|---------|
| `variant` | `primary` \| `outline` \| `ghost` | `primary` |
| `size` | `sm` \| `md` \| `lg` | `md` |
| `disabled` | boolean | `false` |
- `primary`: gold-400 bg, black text, gold glow shadow
- `outline`: transparent bg, gold-400 border/text, fills on hover
- `ghost`: transparent, ivory text, gold text on hover
- Framer Motion: `whileHover scale(1.02)`, `whileTap scale(0.97)`

---

## 4. Folder Architecture

```
Zyrah/
├── public/
│   └── favicon.svg                 # Arabic م on black bg
├── src/
│   ├── assets/                     # (empty — Phase 2+: images, videos)
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.jsx          # Reusable button (primary/outline/ghost)
│   │   └── layout/
│   │       └── Navbar.jsx          # Main floating navbar + mobile menu
│   ├── hooks/
│   │   └── useScrollPosition.js    # scrollY + isScrolled (threshold 50px)
│   ├── pages/
│   │   ├── Home.jsx                # Phase 2: Hero section
│   │   ├── Collections.jsx         # Phase 2: Product grid
│   │   ├── CustomFragrance.jsx     # Phase 2: Custom perfume builder UI
│   │   ├── About.jsx               # Phase 2: Brand story
│   │   └── Contact.jsx             # Phase 2: Contact form
│   ├── styles/
│   │   └── globals.css             # Tailwind v4 @theme tokens + base styles
│   ├── App.jsx                     # Router + AnimatePresence page transitions
│   └── main.jsx                    # React root + BrowserRouter
├── Agent.md                        # THIS FILE — project memory
├── .gitignore
├── index.html                      # Google Fonts preconnect + meta
├── package.json
└── vite.config.js                  # @vitejs/plugin-react + @tailwindcss/vite
```

---

## 5. Dependencies Installed

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.5",
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^4.0.0",
    "vite": "^5.3.1"
  }
}
```

**GSAP** — installed, not yet used. Ready for Phase 2 scroll-triggered animations.

---

## 6. Design System Rules

### Color Tokens (defined in `globals.css` @theme)

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| `gold-300` | `--color-gold-300` | `#E2C27D` | Hover states, light gold |
| `gold-400` | `--color-gold-400` | `#C9A84C` | Primary gold — CTAs, active, accents |
| `gold-500` | `--color-gold-500` | `#A8862E` | Scrollbar, gradients |
| `gold-600` | `--color-gold-600` | `#8A6D1E` | Pressed/dark gold |
| `ivory` | `--color-ivory` | `#F5F0E8` | Primary text |
| `ivory-dark` | `--color-ivory-dark` | `#E8E0D0` | Secondary text |
| `black` | `--color-black` | `#0A0A0A` | Background |
| `black-soft` | `--color-black-soft` | `#111111` | Cards, panels |
| `brown` | `--color-brown` | `#3B1F0F` | Warm accent bg |
| `brown-light` | `--color-brown-light` | `#5C3420` | Warm accent hover |

### Tailwind v4 Usage Notes
- Color tokens in `@theme` auto-generate utility classes: `bg-gold-400`, `text-ivory`, `border-brown`, etc.
- Opacity modifiers work: `text-ivory/70`, `border-gold-400/10`
- `font-heading` class sets `font-family: var(--font-heading)` (Cormorant Garamond)
- `font-body` class sets `font-family: var(--font-body)` (Inter)
- No `tailwind.config.js` needed — all config lives in `globals.css @theme`

### Typography Scale

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display/Hero | Cormorant Garamond | 300 (light) | Hero titles, page headers |
| Heading | Cormorant Garamond | 400–500 | Section headings |
| Italic accent | Cormorant Garamond Italic | 300–400 | Pull quotes, taglines |
| Body | Inter | 300 | Paragraph text |
| UI / Labels | Inter | 400–500 | Buttons, nav, badges |
| Micro / Tracking | Inter | 400 | Uppercase labels, tracking-[0.3em+] |

### Spacing & Layout
- Max content width: `max-w-7xl` (1280px) centered
- Horizontal padding: `px-6` (mobile) → `px-8` (lg)
- Navbar height: ~80px (`pt-80px` via `.page-wrapper`)

---

## 7. Animation Rules

### Libraries
- **Framer Motion** — all React component animations (navbar, menu, buttons, page transitions)
- **GSAP** — Phase 2+: scroll-triggered reveals, parallax, complex timeline sequences

### Easing Standard
```js
// Luxury easing curve — use for reveals, menus, hero elements
ease: [0.76, 0, 0.24, 1]

// Standard spring — use for interactive elements (buttons, hovers)
{ type: 'spring', stiffness: 400, damping: 25 }

// Quick easeOut — use for simple transitions
{ duration: 0.3, ease: 'easeOut' }
```

### Animation Patterns
| Pattern | Implementation |
|---------|---------------|
| Page entrance | `initial opacity:0 y:30` → `animate opacity:1 y:0`, 0.8s luxury ease |
| Navbar entrance | `initial y:-80 opacity:0` → `animate y:0 opacity:1`, delay 0.2s |
| Mobile menu | `clipPath inset(0 0 100% 0)` → `inset(0 0 0% 0)`, 0.5s luxury ease |
| Stagger links | `delay: 0.1 + i * 0.07` per item |
| Button hover | `scale(1.02)` spring |
| Button tap | `scale(0.97)` spring |
| Logo hover | `letterSpacing` 0.15em → 0.22em, 0.4s |
| Nav underline | `width` 0% → 100%, 0.3s easeOut |

### Glassmorphism Class
```css
.glass {
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(201, 168, 76, 0.15);
}
```

---

## 8. Component Rules

- All components: functional, hooks-based, no class components
- Props: destructured with defaults in function signature
- Animation: always via Framer Motion `motion.*` or GSAP ref
- No inline style objects unless dynamic values (prefer Tailwind)
- Import order: React → third-party → local hooks → local components → assets
- No default exports from `index.js` barrel files (import directly)

---

## 9. Responsive Rules

| Breakpoint | Tailwind | Behavior |
|-----------|---------|---------|
| Mobile | (default) | Hamburger menu, stacked layout |
| md (768px) | `md:` | Desktop nav shows, hamburger hides |
| lg (1024px) | `lg:` | Wider padding, larger type scale |
| xl (1280px) | `xl:` | Max-width container clamps |

Mobile-first always. Never desktop-first media queries.

---

## 10. Routing Structure

```
/ → Home.jsx
/collections → Collections.jsx
/custom-fragrance → CustomFragrance.jsx
/about → About.jsx
/contact → Contact.jsx
```

- Router: BrowserRouter (in `main.jsx`)
- Route rendering: `<Routes>` in `App.jsx` wrapped in `<AnimatePresence mode="wait">`
- Active detection: `NavLink` with `end` prop on `/`
- `useLocation` key on `<Routes>` enables AnimatePresence to detect page changes

---

## 11. Reusable Components List

| Component | Path | Props |
|-----------|------|-------|
| `Button` | `src/components/ui/Button.jsx` | `variant`, `size`, `onClick`, `type`, `disabled`, `className` |
| `Navbar` | `src/components/layout/Navbar.jsx` | (none — self-contained) |

**Hooks:**
| Hook | Path | Returns |
|------|------|---------|
| `useScrollPosition` | `src/hooks/useScrollPosition.js` | `{ scrollY, isScrolled }` |

---

## 12. Pending Features

### Phase 2 — Hero Section (Home page)
- Full-screen cinematic hero
- Animated headline (Cormorant Garamond, large)
- Tagline with reveal animation
- Floating perfume bottle (image/video bg or 3D)
- CTA buttons
- Subtle particle/smoke effect
- GSAP scroll-triggered section reveals

### Phase 3 — Collections Page
- Product grid with luxury cards
- Hover: image zoom + gold overlay
- Filter tabs (fragrance family)
- Card entrance animations

### Phase 4 — Custom Fragrance Page
- Multi-step fragrance builder UI
- Note selector (top/middle/base)
- Intensity slider
- Bottle preview

### Phase 5 — About Page
- Brand story
- Founder section
- Timeline / heritage

### Phase 6 — Contact Page
- Contact form (name, email, message, fragrance inquiry)
- WhatsApp CTA (free delivery badge)
- Map / location

### Phase 7 — Footer
- Brand info, links, social
- "Free delivery across India" badge

---

## 13. Next Planned Phase

**PHASE 2 — Home Hero Section**

Build the full cinematic homepage:
- Full-screen hero with luxury headline
- GSAP + Framer Motion scroll reveals
- Ambient video or rich background
- Featured collections teaser
- USP strip (Free delivery, Custom crafted, etc.)

Wait for user message: **"NEXT START"**

---

## 14. Important Notes for Future AI Agents

1. **Tailwind v4**: Config is entirely in `src/styles/globals.css` via `@theme {}`. No `tailwind.config.js`. Color tokens use `--color-*` prefix, font tokens use `--font-*` prefix.

2. **Build verified**: `npm run build` passes cleanly. Dev server: `npm run dev` → localhost:5173.

3. **GSAP not yet used**: Installed and ready. Use for Phase 2 scroll-triggered animations with `gsap.registerPlugin(ScrollTrigger)`.

4. **Font loading**: Google Fonts loaded in `index.html` via `<link>`. Cormorant Garamond = headings (`font-heading` class). Inter = body (`font-body` class, default on `body`).

5. **Mobile menu**: Uses `clipPath` animation, not `height` or `display`. Body scroll is locked via `document.body.style.overflow = 'hidden'` when open.

6. **Page transitions**: `AnimatePresence mode="wait"` + `key={location.pathname}` on `<Routes>`. Each page must have `motion.div` wrapper with entrance animation.

7. **Luxury naming**: Brand is "m_m_attarwala" — exact spelling with underscores. Never use hyphens.

8. **One phase at a time**: Do NOT build Phase 2 until user sends "NEXT START".
