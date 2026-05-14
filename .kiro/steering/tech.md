---
inclusion: always
---

# Orbit Kicks - Technical Stack

## Core Framework
- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Package Manager: npm

## Image Viewer Stack
- react-parallax-tilt (tilt + glare effect on product images)
- react-zoom-pan-pinch (zoom on click / pinch-to-zoom)
- next/image (optimized image rendering)

## Animation Stack
- Framer Motion (UI animations, page transitions, spring entrances, character reveal, marquee)
- GSAP (cinematic timelines if needed)

## Typography
- Archivo Black (display headlines)
- Space Grotesk (body text)
- Both loaded via `next/font/google`

## State Management
- Zustand + Immer (cart, UI state)

## Performance Targets
- 60fps on M1 Mac / RTX 2060
- First paint: < 1.5s
- LCP: < 2.5s

## Development Tools
- ESLint (Next.js rules)
- Prettier