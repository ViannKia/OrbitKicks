# Requirements Document

## Introduction

Orbit Kicks is a premium sneaker e-commerce site built with Next.js 16 (App Router), TypeScript strict mode, Tailwind CSS, and Framer Motion. The UI delivers an immersive, cinematic experience through glassmorphism cards, gradient typography, neon accent colors, and a placeholder 3D viewer area. The MVP covers a Home Page with hero, product grid, and footer; a reusable ProductCard component; global dark-theme styling; Framer Motion page transitions; and a Product Detail Page with a 3D viewer placeholder, size selector, and add-to-cart interaction.

## Glossary

- **App**: The Next.js 16 App Router application
- **Navbar**: The top navigation bar component rendered on every page
- **Hero**: The full-width introductory section on the Home Page
- **ProductCard**: The reusable glassmorphism card component displaying a single sneaker
- **ProductGrid**: The section on the Home Page that renders three ProductCard components
- **ProductDetailPage**: The dynamic route page at `/product/[slug]`
- **ThreeDViewer**: Replaced by `SneakerImageViewer` — the interactive image viewer on the ProductDetailPage using tilt and zoom effects
- **SneakerImageViewer**: The interactive product image component using `react-parallax-tilt` for tilt/glare and `react-zoom-pan-pinch` for zoom-on-click
- **SizeSelector**: The pill-button group on the ProductDetailPage for choosing a shoe size
- **CartButton**: The "Add to Cart" call-to-action button on the ProductDetailPage
- **Footer**: The bottom navigation and social links component
- **PageTransition**: The Framer Motion wrapper that animates route changes
- **SneakerType**: The TypeScript type describing a sneaker product's data shape

---

## Requirements

### Requirement 1: Navbar

**User Story:** As a visitor, I want a navigation bar that is transparent on page load and becomes opaque on scroll, so that the hero section feels immersive while navigation remains accessible when reading content.

#### Acceptance Criteria

1. THE Navbar SHALL render the logo text "Orbit Kicks" with font-weight 700 or higher and a letter-spacing of at least 0.05em.
2. WHILE the page scroll position is 0px, THE Navbar SHALL display with a fully transparent background (background-color with alpha 0).
3. WHEN the user scrolls the page beyond 0px, THE Navbar SHALL transition its background to a solid dark color (minimum opacity 0.85) with a backdrop blur of at least 8px, completing the transition within 200ms using CSS `transition` on `background-color` and `backdrop-filter`.
4. IF the Navbar scroll listener is evaluated in a server-side or non-browser environment where `window` is unavailable, THEN THE Navbar SHALL render in its transparent state without throwing a ReferenceError or TypeError.
5. THE Navbar SHALL be positioned `fixed` at the top of the viewport with a z-index sufficient to overlay all page content (minimum z-index: 50).

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want a visually striking hero section with a gradient headline and a prominent call-to-action button, so that I immediately understand the brand's premium identity and am encouraged to explore products.

#### Acceptance Criteria

1. THE Hero SHALL display the heading "Step Into The Future" with font-weight 800 and a left-to-right gradient fill from `#22d3ee` (cyan-400) to `#a855f7` (purple-500) applied via `background-clip: text` and `color: transparent`.
2. THE Hero SHALL display the subtitle "Experience sneakers like never before in immersive 3D" with a text color of `rgba(255,255,255,0.6)` (white/60).
3. THE Hero SHALL render a "Shop Now" button with an initial box-shadow of `0 0 16px 2px rgba(34,211,238,0.5)` (neon cyan glow).
4. WHEN the user hovers over the "Shop Now" button, THE Hero SHALL scale the button to 1.05 and increase the box-shadow to `0 0 28px 6px rgba(34,211,238,0.75)`, completing the transition within 150ms using an ease-out timing function.
5. WHEN the Hero mounts, THE Hero SHALL animate the heading, subtitle, and button sequentially into view using Framer Motion: each element transitions from `opacity: 0, y: 20px` to `opacity: 1, y: 0` over 0.5s, with a 0.1s stagger delay between each element.

---

### Requirement 3: Product Grid

**User Story:** As a visitor, I want to see a grid of sneaker product cards on the Home Page, so that I can browse available products at a glance.

#### Acceptance Criteria

1. THE ProductGrid SHALL render exactly three ProductCard components on the Home Page.
2. WHEN the ProductGrid mounts, THE ProductGrid SHALL animate each ProductCard into view using Framer Motion with a fade-up effect (duration: 0.5s ease-out).
3. WHEN the ProductGrid mounts, THE ProductGrid SHALL apply entrance animation delays of 0s, 0.1s, and 0.2s to the first, second, and third ProductCard respectively.
4. THE ProductGrid SHALL display cards in a single column on viewports narrower than 768px, two columns on viewports 768px–1023px, and three columns on viewports 1024px and wider.

---

### Requirement 4: ProductCard Component

**User Story:** As a visitor, I want each product card to display the sneaker image, name, price, and a quick-view button in a visually premium glassmorphism style, so that I can evaluate products without leaving the Home Page.

#### Acceptance Criteria

1. THE ProductCard SHALL apply a glassmorphism visual style: a semi-transparent dark background (opacity ≤ 10%), a backdrop blur of at least 8px, and a 1px border with white at opacity ≤ 10%.
2. THE ProductCard SHALL display the product image using `next/image` in the top section with rounded top corners, constrained to a 4:3 aspect ratio container using `object-fit: cover`.
3. THE ProductCard SHALL display the product name in `rgba(255,255,255,0.9)` (white/90) and the price formatted as a currency string with a leading symbol and two decimal places (e.g., "$120.00") in the primary accent color (cyan-400).
4. THE ProductCard SHALL render a "Quick View" button in the card body; clicking this button SHALL navigate to or open the product's detail view identified by the product's `slug`.
5. WHEN the user hovers over a ProductCard, THE ProductCard SHALL scale to 1.02, change the border color to `rgba(34,211,238,0.5)` (cyan-400/50), and apply an elevated box-shadow equivalent to Tailwind's `shadow-xl`, completing the transition within 200ms ease-out; WHEN hover ends, THE ProductCard SHALL return to its original scale, border color, and shadow within the same duration.
6. WHEN the user hovers over the product image within a ProductCard, THE ProductCard SHALL scale the image to 1.05 with a smooth transition of 300ms ease-out; WHEN hover ends, the image SHALL return to scale 1.0.
7. THE ProductCard SHALL accept a `product` prop of type `SneakerType` containing at minimum: `id`, `name`, `price`, `slug`, and `imageUrl` fields.
8. IF the `imageUrl` field of the `product` prop is empty, null, or results in a load error, THEN THE ProductCard SHALL display a placeholder element (solid background with centered icon or text) in place of the image without throwing an error.

---

### Requirement 5: Footer

**User Story:** As a visitor, I want a footer with navigation link columns and social media icons, so that I can find additional site sections and follow Orbit Kicks on social platforms.

#### Acceptance Criteria

1. THE Footer SHALL render at least two columns of navigation links, with each column containing a minimum of three links.
2. THE Footer SHALL render social media icon links for at minimum Instagram, Twitter, and YouTube; each icon link SHALL open its target URL in a new browser tab and SHALL include an accessible `aria-label` describing the platform.
3. WHEN the user hovers over a social media icon, THE Footer SHALL transition the icon's fill or stroke color to the primary accent color (cyan-400, `#22d3ee`) within 150ms using an ease-out timing function.
4. THE Footer SHALL display the copyright notice "© 2025 Orbit Kicks. All rights reserved."

---

### Requirement 6: Global Styling

**User Story:** As a visitor, I want a consistent dark-theme visual language across all pages, so that the site feels cohesive and premium.

#### Acceptance Criteria

1. THE App SHALL apply a CSS radial gradient background from `#000000` at the center to `#111827` at the edges on all pages via the root layout.
2. THE App SHALL use `rgba(255,255,255,0.9)` as the primary text color for headings and body copy, and `rgba(255,255,255,0.6)` as the secondary text color for subtitles and captions.
3. THE App SHALL use `#22d3ee` (cyan-400) as the primary accent color exclusively for primary CTA buttons, hover state borders, focus rings, and active navigation link indicators.
4. THE App SHALL use `#a855f7` (purple-500) as the secondary accent color for gradient text accents, badge and tag components, and secondary CTA borders.
5. THE App SHALL apply a border-radius of `1rem` (16px) to all card components and `9999px` to all button components; card components SHALL additionally apply a semi-transparent background (opacity ≤ 10%) with a backdrop blur of at least 8px to achieve the glassmorphism effect.
6. THE App SHALL use the Inter typeface as the primary font family with a sans-serif fallback stack; the font SHALL be loaded at the application root so it is available on all pages.

---

### Requirement 7: Page Transitions

**User Story:** As a visitor, I want smooth animated transitions between pages, so that navigation feels fluid and premium rather than abrupt.

#### Acceptance Criteria

1. THE PageTransition component SHALL wrap page-level route segments using Framer Motion's `AnimatePresence` with `mode="wait"`, ensuring only one page is mounted at a time during a transition.
2. WHEN a navigation event is initiated and the outgoing page begins unmounting, THE PageTransition SHALL animate the outgoing page from `opacity: 1, scale: 1` to `opacity: 0, scale: 0.98` over 0.4s.
3. WHEN the outgoing page animation completes and the incoming page begins mounting, THE PageTransition SHALL animate the incoming page from `opacity: 0, scale: 0.98` to `opacity: 1, scale: 1` over 0.4s.
4. THE PageTransition SHALL apply a cubic-bezier easing of `[0.4, 0, 0.2, 1]` to both the enter and exit animations.
5. IF a new navigation event is initiated while a transition animation is in progress, THE PageTransition SHALL cancel the in-progress animation and immediately begin the transition to the newly requested page without visual artifacts.
6. IF the user's operating system or browser has `prefers-reduced-motion: reduce` set, THEN THE PageTransition SHALL skip the scale and opacity animations and perform an instant page swap instead.

---

### Requirement 8: Product Detail Page

**User Story:** As a visitor, I want a dedicated product detail page where I can view a 3D model placeholder, select a size, and add the product to my cart, so that I can make an informed purchase decision.

#### Acceptance Criteria

1. THE ProductDetailPage SHALL be accessible at the dynamic route `/product/[slug]` using Next.js App Router file conventions (`src/app/product/[slug]/page.tsx`).
2. THE ProductDetailPage SHALL resolve the `slug` parameter from the `params` Promise using `async/await` as required by Next.js 16 (i.e., `const { slug } = await params`).
3. IF the resolved `slug` does not match any known product, THEN THE ProductDetailPage SHALL render Next.js's `notFound()` response.
3. THE ThreeDViewer placeholder is replaced by `SneakerImageViewer`. THE SneakerImageViewer SHALL render the product image using `next/image` wrapped in `react-parallax-tilt` (with `glare` enabled) and `react-zoom-pan-pinch` for zoom-on-click; the container SHALL have a dashed border, a backdrop blur of at least 8px, and the label "Interactive 3D View" displayed below the image; the container SHALL maintain a minimum height of 400px on desktop viewports.
5. THE ProductDetailPage SHALL display the product name in `rgba(255,255,255,0.9)` with font-weight 700 and the price formatted as a currency string in the primary accent color (cyan-400) in the right sidebar.
6. THE SizeSelector SHALL render available sizes (US 7, 8, 9, 10, 11, 12) as pill-shaped buttons with `border-radius: 9999px`; unselected pills SHALL display a white/20 border and transparent background.
7. WHEN the user selects a size pill, THE SizeSelector SHALL apply a cyan-400 border and a cyan-400/20 background to the selected pill and remove that styling from any previously selected pill.
8. THE CartButton SHALL render an "Add to Cart" button with a cyan-400 background, white text, `border-radius: 9999px`, and a neon cyan box-shadow glow (`0 0 16px 2px rgba(34,211,238,0.5)`).
9. WHEN the user clicks the CartButton, THE CartButton SHALL trigger a particle burst animation using Framer Motion: a minimum of 6 particles SHALL animate from the button's position with `opacity: 1→0` and `y: 0→-40px` over 0.6s.
10. THE ProductDetailPage SHALL render a description section below the 3D viewer and sidebar containing at minimum the product name as a heading and the product's description text.
11. WHEN the ProductDetailPage mounts, THE ProductDetailPage SHALL animate the SneakerImageViewer from `opacity: 0, x: -30px` to `opacity: 1, x: 0` and the sidebar from `opacity: 0, x: 30px` to `opacity: 1, x: 0`, each over 0.5s, with the sidebar animation starting 0.15s after the SneakerImageViewer animation begins.

---

### Requirement 9: TypeScript Type Safety

**User Story:** As a developer, I want all components and pages to use strict TypeScript types, so that the codebase is maintainable and type errors are caught at compile time.

#### Acceptance Criteria

1. THE App SHALL define a `SneakerType` interface exported from `src/types/index.ts` (or a dedicated file in `src/types/`) containing: `id: string`, `name: string`, `slug: string`, `price: number`, `imageUrl: string`, `description: string`, and `sizes: number[]`.
2. THE App SHALL not use the `any` type anywhere in the codebase; ESLint rule `@typescript-eslint/no-explicit-any` SHALL be enabled and set to `"error"`.
3. THE App SHALL enable TypeScript strict mode via `"strict": true` in `tsconfig.json`, which activates `strictNullChecks`, `noImplicitAny`, and related checks.
4. WHEN the `next build` command is executed, THE App SHALL complete without TypeScript compilation errors or warnings treated as errors.
5. ALL React component props SHALL be typed with explicit interfaces or type aliases; no component SHALL use implicit `{}` or untyped props.
6. ALL event handler functions SHALL use the appropriate React synthetic event types (e.g., `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`).

---

### Requirement 10: Component File Structure

**User Story:** As a developer, I want all components organized in the prescribed folder structure, so that the codebase is navigable and consistent with the project's architecture.

#### Acceptance Criteria

1. THE App SHALL place layout components (`Navbar`, `Footer`) in `src/components/layouts/`.
2. THE App SHALL place UI primitives (`Button`, `Card`, `Drawer`, `LoadingSpinner`) in `src/components/ui/`.
3. THE App SHALL place product-specific components (`ProductCard`, `ProductGrid`, `VariantSelector`) in `src/components/product/`.
4. THE App SHALL place product image viewer component (`SneakerImageViewer`) in `src/components/product/`; the `src/components/3d/` folder SHALL NOT exist.
5. THE App SHALL follow the import order in every file: React/Next → third-party libraries → components → hooks → store → utils → types → styles; this order SHALL be enforced via an ESLint import-order rule.
