# Solace Residências - Luxury Real Estate Landing Page Specification

> **Purpose**: This document is a complete technical specification for Claude Code to replicate a luxury real estate single-page website. Every section, animation, transition, typography choice, and interaction is described in detail. The developer should recreate this page with pixel-level fidelity to the described design. **IMPORTANT: All visible text on the website must be in Brazilian Portuguese (pt-BR).**

---

## Table of Contents

1. [Global Design System](#1-global-design-system)
2. [Loading / Intro Animation](#2-loading--intro-animation)
3. [Navigation / Header](#3-navigation--header)
4. [Section 1: Hero](#4-section-1-hero)
5. [Section 2: About](#5-section-2-about)
6. [Section 3: Statistics / Numbers](#6-section-3-statistics--numbers)
7. [Section 4: Our Projects (Image Carousel)](#7-section-4-our-projects-image-carousel)
8. [Section 5: Our Beliefs / Vision](#8-section-5-our-beliefs--vision)
9. [Section 6: Core Values Grid](#9-section-6-core-values-grid)
10. [Section 7: Wellness-Centered Amenities](#10-section-7-wellness-centered-amenities)
11. [Section 8: Footer / Closing](#11-section-8-footer--closing)
12. [Animations & Transitions Summary](#12-animations--transitions-summary)
13. [Responsive Considerations](#13-responsive-considerations)
14. [Assets Needed](#14-assets-needed)

---

## 1. Global Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#1a1a1a` | Main page background |
| `--bg-card` | `#232323` | Card backgrounds, section containers |
| `--bg-overlay` | `rgba(0,0,0,0.5)` | Dark overlays on images |
| `--text-primary` | `#ffffff` | Headings, primary text |
| `--text-secondary` | `#b0b0b0` | Body text, descriptions |
| `--text-muted` | `#707070` | Labels, small annotations |
| `--accent` | `#c9b99a` | Gold/warm accent for italic highlights |
| `--border` | `rgba(255,255,255,0.08)` | Subtle borders and dividers |
| `--btn-light` | `#f5f5f0` | Light button backgrounds (CTA) |
| `--btn-text` | `#1a1a1a` | Dark text on light buttons |

### Typography

| Element | Font Family | Weight | Size (desktop) | Style |
|---------|-------------|--------|----------------|-------|
| Hero title ("SOLACE") | Serif display (e.g. `"Playfair Display"`, `"EB Garamond"`, or similar high-contrast serif) | 400 | ~180-220px | Normal, uppercase, tight letter-spacing (-0.03em). |
| Section headings | Same serif display | 400 | ~60-80px | Mixed case, some words in italic for emphasis |
| Sub-headings | Same serif | 300-400 | ~24-32px | Italic, uppercase |
| Section labels | Sans-serif (e.g. `"Inter"`, `"Helvetica Neue"`) | 400 | ~12-14px | Uppercase, letter-spacing 0.15em, often in parentheses like `(SOBRE)` |
| Body text | Sans-serif | 300 | ~14-16px | Normal, line-height ~1.6 |
| Button text | Sans-serif | 400 | ~12-14px | Uppercase, letter-spacing 0.1em |
| Statistics numbers | Serif display | 300 | ~120-160px | Normal |
| Statistics labels | Sans-serif | 300 | ~12-13px | Normal, muted color |

### General Styling

- **Border radius**: Rounded corners on major section containers: `~16-20px`
- **Spacing**: Generous padding throughout: sections have `~80-120px` vertical padding
- **Page background**: The overall page has a very dark (`#1a1a1a`) background. Each section sits inside a slightly lighter rounded card (`#232323`) with a subtle border
- **Max width**: Content containers appear to be `~1200-1400px` centered
- **Image treatment**: All images are high-quality architectural/interior photography with slight desaturation and warm undertones

---

## 2. Loading / Intro Animation

The page begins with a **cinematic intro transition** before the hero section is fully visible:

### Sequence (observed from frames 1-5):

1. **Initial state**: The page appears in a **zoomed-out overview** showing multiple sections simultaneously as small tiles/cards arranged in a bento-grid-like layout (like a bird's-eye view of the entire site). The hero is visible in the center, with surrounding cards showing previews of other sections (bedroom image top-left, living room top-right, floor plan bottom-left, wellness section bottom, values section top).

2. **Zoom-in animation**: Over ~1.5-2 seconds, the view **smoothly zooms into the hero section**, scaling from the overview to full-screen. The surrounding preview cards slide outward and fade as the hero card expands to fill the viewport.

3. **Final state**: The hero section is now full-screen with all its content visible.

### Implementation Notes:
- This could be achieved with CSS `transform: scale()` animation from a small scale (e.g., `scale(0.45)`) to `scale(1)`
- The bento grid overview should use `position: fixed` during the animation, then transition to normal document flow
- Duration: ~1.5-2s with `cubic-bezier(0.76, 0, 0.24, 1)` easing (smooth deceleration)
- Alternative: Use GSAP ScrollTrigger or Framer Motion for more control
- The surrounding cards can be absolutely positioned around the hero and animated with `opacity: 1 -> 0` and `transform: translate()` outward

---

## 3. Navigation / Header

### Layout
- **Position**: Fixed at the top of the hero section (not sticky across pages - lives within the hero)
- **Height**: ~60-70px
- **Background**: Transparent (overlaying the hero image)
- **Content alignment**: Three sections spread across the width

### Left
- Brand name: **"SOLACE"** in uppercase serif, ~18px, letter-spacing 0.1em
- Below it (very small): "RESIDÊNCIAS" or a tagline in ~10px sans-serif, muted

### Center
- Language selector: **"PT"** and **"EN"** separated by a small dash/divider
- Very minimal, ~12px sans-serif

### Right
- CTA button: **"AGENDE UMA VISITA"** with a rounded pill shape
  - Border: 1px solid white
  - Background: transparent
  - Text: white, ~12px, uppercase
  - Padding: ~8px 24px
  - Border-radius: 50px (full pill)
  - **Hover**: background fills to white, text turns dark (smooth transition ~0.3s)
- Hamburger menu icon: 3 horizontal lines to the right of the CTA button, ~20px wide

### Divider
- A thin horizontal line (`rgba(255,255,255,0.15)`) runs across the full width just below the nav, separating it from the hero content

---

## 4. Section 1: Hero

### Layout
- **Full viewport height** (100vh)
- **Background**: Large architectural photograph of a modern luxury home at dusk/twilight
  - The image shows a contemporary house with dark wood cladding, large glass windows, a prominent mature tree, green lawn, and warm interior lighting visible through windows
  - Image has a subtle dark overlay gradient from bottom (~40% opacity) for text readability
- **Content**: Two text blocks positioned over the image

### Left Content (positioned bottom-left, roughly 40% from left)
- **Main title**: "SOLACE" in massive serif display font
  - Size: ~180-220px (takes up ~60% of the viewport width)
  - Color: white
  - Font-weight: 400
  - The text is so large that it overlaps/bleeds over the building in the image (text sits ON TOP of the image)
  - Letter-spacing: very tight (-0.02em to -0.04em)

### Right Content (positioned center-right, ~60% from left, vertically centered)
- **Subtitle (italic heading)**: *"LUXO HOLÍSTICO EM PERFEITA HARMONIA"*
  - Serif italic, ~20-24px, white
  - Letter-spacing: 0.05em
- **Description paragraph** (below subtitle, ~14px, light gray, max-width ~350px):
  > "Bem-vindo à Solace Residências, onde design atemporal, vida focada no bem-estar e enriquecimento cultural convergem em unidade para criar um santuário incomparável de elegância e serenidade."
- **Scroll indicator** (bottom-center of hero):
  - Text: "DESLIZE" in uppercase sans-serif, ~11px, letter-spacing 0.2em
  - Positioned at the bottom center of the hero section
  - Optional: a small animated line or arrow below it

### Animations (scroll-triggered):
- The hero image has a subtle **parallax effect** - the background image moves at a slower rate than the foreground content as the user scrolls (background-attachment: fixed or transform-based parallax)
- The "SOLACE" title fades out and scales slightly as you scroll down (opacity and transform tied to scroll position)
- The hero content overall slides up and fades as scrolling begins

---

## 5. Section 2: About

### Layout
- **Two-column layout** within a dark rounded card container
- Left column: ~45% width (text)
- Right column: ~55% width (image + text)

### Left Column
- **Section label**: `(SOBRE)` in uppercase sans-serif, ~12px, letter-spacing 0.15em, positioned top-left of section
- **Large heading** (positioned lower in the left column):
  - "DESIGN" (serif, normal weight, white)
  - "ATEMPORAL." (serif, normal weight, white)
  - "*BEM-ESTAR*" (serif, **italic**, slightly golden/warm accent color `#c9b99a`)
  - "*COMO*" (serif, **italic**, warm accent)
  - "ESTILO DE VIDA." (serif, normal weight, white)
  - Size: ~50-60px per line
  - The italic words have a warmer tone compared to the regular weight words
  - Line-height: ~1.1

### Right Column
- **Image**: A luxurious modern living room photograph
  - Shows a spacious room with floor-to-ceiling windows, a large comfortable sofa in beige/taupe, a dark wood coffee table, an abstract painting on the wall, a modern floor lamp, and natural light streaming in
  - Image has rounded corners (~12px)
  - Takes up roughly a tall rectangle (aspect ratio ~3:4)

- **Text block** (positioned to the right of or below the image):
  - Paragraph 1: "Cada elemento da Solace Residências reflete um compromisso com a excelência. Da elegância atemporal de seus interiores às comodidades cuidadosamente selecionadas, o empreendimento incorpora uma abordagem holística ao viver com luxo."
  - Paragraph 2: "Seja buscando um refúgio sereno, um polo cultural ou um espaço que promova o crescimento pessoal, a Solace Residências oferece tudo isso."
  - Font: sans-serif, ~14px, line-height 1.6, color `#b0b0b0`

- **CTA button**: "SAIBA MAIS"
  - Pill-shaped, border: 1px solid white, transparent background
  - Same style as header CTA
  - **Hover**: fills white, text turns dark

### Animations:
- **Text reveal**: The heading words animate in one by one from below with a staggered fade-in + slide-up effect as the section enters the viewport
  - Each line has a ~0.15s delay from the previous one
  - Animation: `translateY(40px) opacity(0)` -> `translateY(0) opacity(1)`
  - Duration: ~0.6s per element
  - Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Image reveal**: The living room image animates in with a **clip-path reveal** or **slide-up with fade** from below
  - The image appears to "grow" from the bottom upward (clip-path: `inset(100% 0 0 0)` -> `inset(0)`)
  - Duration: ~0.8s
- **Parallax**: Subtle parallax on the image (moves slightly slower than scroll)

---

## 6. Section 3: Statistics / Numbers

### Layout
- **Full-width dark section** with rounded card container
- **Asymmetric/scattered layout** - the four statistics are positioned in a deliberately non-grid arrangement across the section
- Background: `#232323` (dark card)

### Statistics (with animated counting):

| Position | Number | Unit | Description |
|----------|--------|------|-------------|
| Bottom-left | **150k** | m² | "de espaço projetado com maestria." |
| Top-center | **60** | % | "áreas verdes para tranquilidade e bem-estar." |
| Top-right | **30** | (none) | "residências exclusivas, cada uma pensada para conforto e elegância." |
| Bottom-center | **24/7** | (none) | "serviços de concierge, atendendo cada necessidade com excelência." |

### Typography
- **Numbers**: Massive serif display font, ~120-160px, white, font-weight 300 (thin/light)
- **Unit labels** (m², %): Same serif but smaller (~30-40px), positioned to the right of the number
- **Descriptions**: Sans-serif, ~12-13px, `#808080`, max-width ~200px, positioned below each number

### Positioning
- The stats are NOT in a grid - they are scattered/staggered:
  - "150k m²" - positioned left, lower in the section
  - "60%" - positioned center-right, higher up
  - "30" - positioned far right, high
  - "24/7" - positioned center-left, at the bottom

### Animations:
- **Counter animation**: Each number counts up from 0 to its final value as the section enters the viewport
  - Observed in frames: numbers progress from small values (5k, 10%, 1, ...) to final values (150k, 60%, 30)
  - Duration: ~2-2.5 seconds
  - Easing: ease-out (starts fast, decelerates)
  - Numbers should count smoothly, not step by step
  - "24/7" appears as a static value (no counting needed, or count from 0/0)
- **Staggered entrance**: Each stat group fades in with slight delay (~0.2s between each)
- **Scroll-linked**: The counting begins only when the section is ~30% visible in the viewport

---

## 7. Section 4: Our Projects (Image Carousel)

### Layout
- **Full-width section** with dark rounded card container
- **Section label**: `(NOSSOS PROJETOS)` top-left, same style as About label
- **Pagination indicators**: Top-right, three circles `(1) (2) (3)` indicating carousel position
  - Active: filled white circle
  - Inactive: outlined/hollow circles

### Content Structure
- **Large centered title**: Project name in huge serif display
  - Example: **"LUMIÈRE DUPLEX RESIDÊNCIAS"**
  - Size: ~60-80px, centered, serif italic
  - The accent on "E" in "LUMIÈRE" should be present

- **Three images**: Displayed in a horizontal row
  - Left image: tall/portrait orientation (~25% width)
  - Center image: slightly larger, portrait (~30% width)
  - Right image: tall/portrait (~25% width)
  - Images show luxury interiors: sitting area with pendant lights, bedroom with wood headboard, living room with sofa
  - All images have slight rounded corners (~8px)
  - Small gaps (~16px) between images

- **Description text** (below images, left-aligned):
  > "Apartamentos duplex de luxo com espaços iluminados, terraços privativos e uma seleção de comodidades exclusivas."
  - Sans-serif, ~13px, light gray

- **CTA Button**: "SAIBA MAIS" pill button, right of description text
  - Background: white/light (`#f5f5f0`)
  - Text: dark
  - Border-radius: 50px

### Animations:
- **Image carousel transition**: The three images have an **auto-sliding carousel** effect
  - The images slide horizontally as a group, transitioning between different interior photos
  - Transition: smooth horizontal slide with crossfade (~0.6s)
  - The center image changes while side images also update
  - Observed: images shift positions - what was center moves left, new image enters from right
- **Title transition**: When carousel changes, the project title can crossfade to a new project name
- **Parallax on images**: Each image has slight independent vertical parallax (center moves differently than sides)
- **Hover on images**: Subtle scale-up (1.02-1.05) with smooth transition

---

## 8. Section 5: Our Beliefs / Vision

### Layout
- **Two-column layout** within rounded card container
- Left: ~55% width - large background image
- Right: ~45% width - text content on dark background

### Left Column - Image
- **Full-height image** of the same modern living room (beige sofa, dark coffee table, floor lamp, large windows, abstract art)
- Image fills the left portion of the card
- Has slight rounded corners on the left side matching the card

### Right Column - Content
- **Section label**: `(NOSSOS VALORES)` top-right of the text area, same parenthetical style
- **Large heading**:
  - "UMA VISÃO DE" (first line)
  - "VIVER INSPIRADO" (second line)
  - Serif display, ~50-60px, white, italic
  - The text has an elegant typographic treatment with varying weights
- **Description paragraph**:
  > "Inspirar e cultivar um estilo de vida enriquecido que harmonize beleza, bem-estar e conexão cultural, criando um santuário que se sinta como lar."
  - Sans-serif, ~14px, `#b0b0b0`, line-height 1.6
- **CTA Button**: "AGENDE UMA VISITA" - white pill button (same as above)

### Animations:
- **Text reveal**: Heading text animates in with a clip-path or mask reveal from bottom
  - Each line reveals sequentially with ~0.2s delay
  - Effect: text appears to "type" or "unveil" from left to right, or slides up from behind a mask
  - Duration: ~0.8s
- **Image parallax**: The left image has a subtle vertical parallax effect
- **Image clip reveal**: The image may reveal with a horizontal clip/wipe from left to right as section enters viewport

---

## 9. Section 6: Core Values Grid

### Layout
- **Full-width section** with a large interior photograph as background (modern minimalist living room with white sofa, wood accents, vertical wood slat wall feature)
- **Semi-transparent overlay** on the background image (`rgba(0,0,0,0.55)`)
- **Grid overlay**: A 2x3 or 3x2 grid of value cards is overlaid on the image
- The grid has thin white borders between cells

### Grid Content
The grid contains 5 value blocks arranged in two rows:

**Top Row (2 items, larger cells):**

1. **BEM-ESTAR HOLÍSTICO**
   - Title: serif italic, ~24px, white
   - Description: "Espaços projetados para nutrir a mente, o corpo e a alma."
   - Number: `(1)` in bottom-right of cell
   - Sans-serif, ~12px, muted

2. **DISCRIÇÃO & EXCLUSIVIDADE**
   - Title: serif italic, ~24px, white
   - Description: "Privacidade e crescimento pessoal em primeiro lugar."
   - Number: `(2)`
   - Center of this cell has a **line-art illustration** of an abstract floral/organic shape (minimalist line drawing, thin white strokes)

**Bottom Row (3 items, smaller cells):**

3. **ENRIQUECIMENTO CULTURAL**
   - Title: serif, ~20px, white, bold/caps
   - Description: "Celebre a arte, a história e as tradições locais."
   - Number: `(3)`

4. **COMUNIDADE & CONEXÃO**
   - Title: serif italic, ~20px, white
   - Description: "Um ambiente acolhedor que fortalece relacionamentos."
   - Number: `(4)`

5. **ELEGÂNCIA SUSTENTÁVEL**
   - Title: serif, ~20px, white
   - Description: "Luxo que respeita o nosso meio ambiente."
   - Number: `(5)`

### Right Side Text (outside grid, right column)
- "Na Solace Residências, acreditamos que um lar é mais do que um espaço físico — é um reflexo de suas aspirações, bem-estar e valores."
- "Nossa missão é imergir você em um estilo de vida que equilibra estética refinada, excelência arquitetônica e um profundo senso de comunidade."
- Sans-serif, ~13px, `#c0c0c0`

### Animations:
- **Grid cells reveal**: Each cell fades in and slides up with staggered timing as section enters viewport
  - Stagger: ~0.15s per cell (top-left first, bottom-right last)
  - Animation: `translateY(30px) opacity(0)` -> `translateY(0) opacity(1)`
- **Background parallax**: The background image has a slow parallax scroll effect
- **Border animation**: Grid borders may animate in (draw-on effect) from center outward
- **Hover on cells**: Subtle background brightness increase on hover

---

## 10. Section 7: Wellness-Centered Amenities

### Layout
- **Two-column asymmetric layout** within rounded card container
- Left: ~35% width - dark background with text
- Right: ~65% width - two overlapping/adjacent images

### Left Column - Text
- **Large heading**:
  - "COMODIDADES" (serif, normal, white, ~50px)
  - "FOCADAS EM" (serif, normal, white, ~50px)
  - "*BEM-ESTAR*" (serif, **italic**, warm golden accent color `#c9b99a`, ~50px)
- **Description paragraph**:
  > "De estúdios privativos de fitness a sessões guiadas de meditação, nossas comodidades são projetadas para aprimorar seu bem-estar e promover um senso de harmonia."
  - Sans-serif, ~14px, `#b0b0b0`
- **CTA button**: "SAIBA MAIS" white pill button

### Right Column - Images
- **Two images** arranged in an overlapping/stacked composition:
  1. **Front/left image** (slightly smaller, overlapping): Modern gym/fitness studio with floor-to-ceiling windows, exercise equipment, wooden flooring
     - Aspect ratio: ~4:3
     - Has slight rotation or offset for visual interest
  2. **Back/right image** (larger): Dramatic architectural interior - a curved modern corridor/hallway with geometric glass ceiling, natural light, concrete/white walls
     - Aspect ratio: ~3:4
     - This image extends to the edge of the card

### Animations:
- **Text slide-in**: Heading text slides in from left with fade
- **Image reveal**:
  - Right image reveals first with a scale-up from 0.9 to 1.0 + fade
  - Left image (gym) slides in from the left or bottom with a slight delay (~0.3s)
  - Creates a layered reveal effect
- **Parallax**: Both images have independent subtle parallax movement on scroll

---

## 11. Section 8: Footer / Closing

### Layout (observed from final frames)
- **Full-width section** showing the hero image again
- Large brand name "SOLACE" overlaid at the bottom of the image (similar to hero but at page end, with "RESIDÊNCIAS" below in smaller text)
- This creates a **bookend effect** - the page begins and ends with the same dramatic brand reveal

### Animation:
- As user scrolls to the bottom, the brand name scales up from small to large (reverse of the intro)
- Creates a satisfying visual loop

---

## 12. Animations & Transitions Summary

### Scroll-Triggered Animations
All animations should be triggered when elements enter the viewport (using Intersection Observer API or GSAP ScrollTrigger).

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Intro zoom-in | Page load | 1.5-2s | `cubic-bezier(0.76, 0, 0.24, 1)` |
| Text fade-up reveal | Element 30% visible | 0.6-0.8s | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Image clip reveal | Element 20% visible | 0.8-1s | `ease-out` |
| Counter animation | Section 30% visible | 2-2.5s | `ease-out` |
| Grid stagger reveal | Section 20% visible | 0.5s each, 0.15s stagger | `ease-out` |
| Carousel slide | Auto (every 4-5s) or click | 0.6s | `cubic-bezier(0.4, 0, 0.2, 1)` |

### Parallax Effects
- **Hero background image**: Moves at 0.5x scroll speed (subtle)
- **About section image**: Moves at 0.7x scroll speed
- **Values grid background**: Moves at 0.4x scroll speed
- **Project carousel images**: Each image moves at slightly different rates (0.6x, 0.7x, 0.8x) for depth

### Hover Effects
| Element | Effect | Duration |
|---------|--------|----------|
| Buttons (pill) | Background fills white, text turns dark | 0.3s |
| Project images | Scale to 1.03 | 0.4s |
| Grid value cells | Slight brightness increase | 0.3s |
| Nav links | Opacity 0.7 -> 1.0 | 0.2s |

### Page Transitions
- Smooth scroll behavior: `scroll-behavior: smooth` or custom smooth scroll with JS
- All sections should flow seamlessly with no harsh jumps

---

## 13. Responsive Considerations

### Desktop (1200px+)
- Full layout as described above
- All columns side-by-side
- Large typography sizes

### Tablet (768px - 1199px)
- Two-column layouts may stack to single column
- Typography scales down ~20%
- Carousel shows 2 images instead of 3
- Statistics may reorganize to 2x2 grid

### Mobile (< 768px)
- All sections stack vertically
- Hero title reduces to ~80-100px
- Hamburger menu replaces full nav
- Carousel shows 1 image at a time
- Statistics stack vertically
- Padding reduces to ~40-60px

---

## 14. Assets Needed

The developer will need to source or create the following:

### Images (ask the user to provide or use high-quality stock photos)

1. **Hero image**: Modern luxury home exterior at twilight/dusk
   - Dark wood cladding, glass walls, mature tree, green lawn
   - Warm interior lighting visible
   - Landscape orientation, high resolution (min 2560px wide)

2. **About section - Living room**: Spacious modern living room
   - Large comfortable sofa (beige/taupe), dark wood coffee table
   - Floor-to-ceiling windows with natural light
   - Abstract art on wall, modern floor lamp
   - Portrait orientation

3. **Projects carousel** (6-9 images, 3 per project slide):
   - Luxury sitting area with pendant lighting
   - Modern bedroom with wood headboard
   - Contemporary living space with rich materials
   - Lounge area with designer furniture
   - Additional interior shots

4. **Values section background**: Modern minimalist living room
   - White/cream sofa, wood accents, vertical wood slat wall
   - Clean, bright, architectural feel
   - Landscape orientation

5. **Line art illustration**: Abstract floral/organic minimalist line drawing
   - Thin white strokes on transparent background
   - SVG format preferred
   - Used in the Discretion & Exclusivity grid cell

6. **Amenities images**:
   - Modern gym/fitness studio with floor-to-ceiling windows
   - Dramatic architectural corridor with curved walls and geometric glass ceiling

### Fonts
- **Serif display**: Playfair Display, Cormorant Garamond, or EB Garamond (Google Fonts)
- **Sans-serif**: Inter, Helvetica Neue, or similar clean sans-serif

### Icons
- Hamburger menu icon (3 lines)
- Language selector separator
- Carousel pagination dots/circles

---

## Technical Implementation Notes

### Required Stack (MANDATORY)

This project MUST be built with the following stack:

#### Framework & Core
- **Next.js 14+** (App Router) — React framework for structure, routing, SSR/SSG, and image optimization
- **TypeScript** — for type safety across all components
- **Tailwind CSS v4** — utility-first CSS for all styling

#### Animation & Scrolling
- **GSAP (GreenSock) v3** with **ScrollTrigger** plugin — for ALL scroll-based animations:
  - Parallax effects
  - Text reveal animations (staggered fade-up)
  - Image clip-path reveals
  - Counter/number animations
  - Grid cell stagger reveals
  - Intro zoom animation
- **Lenis** (`@studio-freight/lenis`) — for buttery smooth scrolling across the entire page

#### Project Setup
```bash
npx create-next-app@latest solace-residencias --typescript --tailwind --app --src-dir
cd solace-residencias
npm install gsap @studio-freight/lenis
```

#### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, Lenis provider
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Tailwind directives + CSS custom properties
├── components/
│   ├── SmoothScroll.tsx    # Lenis smooth scroll wrapper
│   ├── IntroAnimation.tsx  # Bento grid zoom-in intro
│   ├── Header.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section with text reveal
│   ├── Statistics.tsx      # Animated counters section
│   ├── Projects.tsx        # Image carousel section
│   ├── Beliefs.tsx         # Vision section
│   ├── Values.tsx          # Core values grid with background
│   ├── Amenities.tsx       # Wellness amenities section
│   └── Footer.tsx          # Footer / closing brand reveal
├── hooks/
│   ├── useGsapReveal.ts    # Reusable scroll-triggered reveal hook
│   ├── useCounter.ts       # Counter animation hook
│   └── useParallax.ts      # Parallax effect hook
├── lib/
│   └── animations.ts       # GSAP animation presets and utilities
└── public/
    └── images/             # All project images (WebP format)
```

#### Fonts Configuration (next/font)
```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
```

#### Tailwind CSS Custom Theme (tailwind.config.ts)
```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        card: '#232323',
        accent: '#c9b99a',
        muted: '#707070',
        'text-secondary': '#b0b0b0',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '50px',
      },
    },
  },
}
```

#### GSAP + Lenis Integration Pattern
```typescript
// components/SmoothScroll.tsx
'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return <>{children}</>
}
```

#### Key Implementation Rules
1. **All components must be Client Components** (`'use client'`) since they use GSAP/browser APIs
2. Use `useLayoutEffect` or `useEffect` with `gsap.context()` for proper cleanup
3. Use `next/image` for ALL images (automatic WebP conversion, lazy loading, responsive sizes)
4. Wrap GSAP animations in `gsap.context()` and return cleanup function
5. Use `ScrollTrigger.create()` for scroll-linked animations, not Intersection Observer
6. All animation values (duration, easing, delays) should match the specs in sections above

### Performance
- Use `next/image` with `priority` on hero image, lazy load everything else
- Use `will-change: transform` on parallax elements
- Use `transform` and `opacity` only for animations (GPU-accelerated)
- Images in `public/images/` in WebP format with fallbacks
- Use dynamic imports (`next/dynamic`) for heavy animation components if needed

### Accessibility
- All images should have descriptive `alt` text in Portuguese
- Buttons should have proper focus states (visible focus ring)
- Respect `prefers-reduced-motion` media query — disable parallax and complex animations
- Ensure sufficient color contrast for body text
- Keyboard navigable carousel (arrow keys, tab)
- Use semantic HTML (`<section>`, `<nav>`, `<header>`, `<footer>`, `<article>`)

### Key Interactions Checklist
- [ ] Intro zoom animation on page load (GSAP timeline)
- [ ] Lenis smooth scrolling active on entire page
- [ ] Parallax effects via GSAP ScrollTrigger on hero, about, values, amenities
- [ ] Text reveal animations on scroll (staggered fade-up with GSAP)
- [ ] Image clip-path/reveal animations on scroll (GSAP ScrollTrigger)
- [ ] Counter animation for statistics (GSAP countUp with ScrollTrigger)
- [ ] Image carousel with auto-play and manual navigation
- [ ] Hover effects on all interactive elements (Tailwind + CSS transitions)
- [ ] Responsive layout at all breakpoints (Tailwind responsive prefixes)
- [ ] Loading state / preloader (optional)

---

## Fictitious Brand Details

- **Brand Name**: Solace Residências
- **Tagline**: "Luxo Holístico em Perfeita Harmonia"
- **Project Names**:
  - Lumière Duplex Residências (apartamentos duplex de luxo)
  - Solara Penthouse Collection (not shown but for carousel)
  - Verdana Garden Villas (not shown but for carousel)
- **Location**: Implied upscale/exclusive location (not specified)
- **Key Selling Points**: Bem-estar, enriquecimento cultural, luxo sustentável, comunidade, privacidade

### Language Note
All visible UI text (headings, paragraphs, buttons, labels, descriptions) MUST be in **Brazilian Portuguese (pt-BR)**. Code comments, class names, and technical documentation can remain in English.
