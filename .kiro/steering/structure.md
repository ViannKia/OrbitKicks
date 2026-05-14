---
inclusion: always
---

# Orbit Kicks - Folder Structure

## Root Structure

orbit-kicks/
├── src/
│ ├── app/
│ ├── components/
│ ├── hooks/
│ ├── lib/
│ ├── store/
│ └── types/
├── public/
│ └── models/
├── .kiro/
│ └── steering/
└── ...


## Components Folder Detail

src/components/
├── ui/
│ ├── Button.tsx
│ ├── Card.tsx
│ ├── Drawer.tsx (cart)
│ └── LoadingSpinner.tsx
├── product/
│ ├── ProductCard.tsx        # Glassmorphism card dengan next/image + hover zoom
│ ├── ProductGrid.tsx
│ ├── SneakerImageViewer.tsx # react-parallax-tilt + react-zoom-pan-pinch
│ └── VariantSelector.tsx
└── layouts/
├── Navbar.tsx
└── Footer.tsx


## Naming Conventions
- Components: PascalCase (`SneakerViewer.tsx`)
- Hooks: camelCase with 'use' prefix (`useSneakerModel.ts`)
- Utils: camelCase (`formatPrice.ts`)
- 3D models: kebab-case (`nike-air-jordan-1.glb`)
- Types: PascalCase with 'Type' suffix (`SneakerType`)

## Import Order (wajib)
1. React/Next
2. Third-party (three, framer, etc)
3. Components
4. Hooks
5. Utils
6. Types
7. Styles