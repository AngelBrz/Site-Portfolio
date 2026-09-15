# Design System: Angel Gabriel Portfolio OS
**Project ID:** AG-PORTFOLIO-2026
**Version:** 2.4.0
**Architecture:** React (Vite) + Framer Motion + Vanilla CSS Modules

---

## 1. Visual Theme & Atmosphere
- **Core Aesthetic:** Minimalist Cyber-Editorial Dark Mode. A fusion of Swiss structural clarity, high-end editorial contrast, and Apple-grade restrained tactile interactions.
- **Mood & Atmosphere:** Serious, calculated, authoritative. Evokes high-performance operational infrastructure for business owners who value ROI over gimmicks.
- **Density & Scale:** Density Level 5 (Balanced Executive). Generous section breathing room (110px vertical margins), strictly bounded reading lengths (max 65ch for body copy).
- **Anti-Patterns & Banned AI Clichés:**
  - BANNED: Over-saturated neon glows, fluorescent purple halos, or diffuse colored outer glows.
  - BANNED: Bouncing chevrons, floating decorative badges, or unnecessary cartoonish emojis.
  - BANNED: Generic placeholders (John Doe, Acme, etc.). All metrics and cases must use authentic, high-fidelity business context.
  - BANNED: Layout shifts caused by animating width/height. All transitions are strictly restricted to transform and opacity.

---

## 2. Color Palette & Functional Roles
The palette is rooted in an ultra-deep obsidian base with surgical purple and metallic accents:

- **Deep Canvas Base (`#050505`)**: The core dark background surface across the entire viewport.
- **Surface Elevation 1 (`#0a0a0c`)**: Layered containment panels, secondary headers, and structural backgrounds.
- **Surface Elevation 2 (`#121214`)**: Card backgrounds, modal backings, and dropdown surfaces.
- **Surface Glass Overlay (`rgba(18, 18, 20, 0.70)`)**: Frosted backdrop-filtered cards with subtle depth.
- **Primary Violet Accent (`#8b5cf6`)**: Surgical highlight color for primary actions, metric calls, and focal points. Saturation strictly disciplined.
- **Violet Accent Hover (`#7c3aed`)**: Interaction state for focused buttons and active controls.
- **Text Primary (`#f4f4f5`)**: 95% White, ultra-crisp editorial headline and title readability (WCAG AAA compliant).
- **Text Secondary (`#a1a1aa`)**: Zinc-400 body copy for relaxed, strain-free scanning.
- **Text Muted (`#71717a`)**: Zinc-500 for auxiliary labels, timestamps, and secondary captions.
- **Subtle Structural Border (`rgba(255, 255, 255, 0.06)`)**: 1px to 2px razor borders defining component boundaries without visual clutter.
- **Active Border Accent (`rgba(139, 92, 246, 0.40)`)**: Highlight border for active selections and hovered cards.

---

## 3. Typography Rules & Hierarchy
Built on clean geometric and humanist sans-serif typefaces:

- **Headline Font:** `'Outfit', sans-serif`
  - Weights: 700 (Bold), 800 (Extra Bold).
  - Letter-Spacing: `-0.025em` to `-0.03em` (track-tight for impactful editorial titles).
  - Line-Height: 1.08 to 1.15.
- **Body Font:** `'Inter', -apple-system, sans-serif`
  - Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold).
  - Letter-Spacing: `-0.01em`.
  - Line-Height: 1.6 to 1.7 for sustained readability.
- **Monospace Data Font:** `'JetBrains Mono', 'Courier New', monospace`
  - Weights: 500, 700.
  - Usage: Financial calculations, ROI multipliers, simulator values, and currency displays.

---

## 4. Component Stylings & Interaction Mechanics

### Buttons & Interactive Triggers
- **Primary CTA (`.btn-primary`):** Solid violet fill (`#8b5cf6`), `#ffffff` bold text, razor radius (`4px` to `6px`). Hover applies a calculated lift (`translateY(-2px)`) with a restrained ambient shadow.
- **Secondary Action (`.btn-secondary`):** Semi-transparent background with a 1px border (`rgba(255, 255, 255, 0.1)`), transitioning to white text on hover.
- **Tactile Feedback:** All clicks feature micro-compression (`scale(0.98)`) for immediate physical feedback.

### Bento Grid & Architecture Cards
- **Geometry:** Angular architectural containers with razor corners or micro-radius (`4px`).
- **Surface:** `#121214` with a 1px semi-transparent white border (`rgba(255, 255, 255, 0.06)`).
- **Hover State:** Smooth border transition to violet (`rgba(139, 92, 246, 0.5)`), slight ambient lift, and icon container background illumination.

### Mobile Mockup (Interactive Showcase)
- **Geometry:** Custom hardware frame (`#0d0d10`) with realistic notch, rounded corners (`44px`), and a 4px structural graphite border (`#2a2a2e`).
- **Scroll Synchronization:** Synchronized to the viewport scroll (`useScroll` and `useTransform`), translating horizontally along the X-axis in direct proportion to mouse wheel movement.

### Editorial Case Cards (Infinite Slider)
- **Minimalist Aesthetic:** Stripped of heavy photographic banners; text-first, data-heavy presentation.
- **Structure:** Brand name (`Outfit Bold`), operational thesis summary, and a dedicated high-contrast metric callout box (`#8b5cf6` accent text with zinc body).

### Dynamic Investment Simulator
- **Interactive Matrix:** Multi-service selection grid with instant state calculation.
- **Real-Time Projection Display:** Prominent gradient-accented currency calculation showing minimum to maximum investment ranges with instant feedback.

---

## 5. Depth, Elevation & Spatial Rules
- **Layering Principle:** Elevation is communicated via subtle border contrast and tone shifts, rather than thick muddy drop shadows.
- **Shadow Physics:** Diffused ambient occlusion (`0 20px 40px -15px rgba(0, 0, 0, 0.6)`). Zero colored neon outlines.
- **Glassmorphism Discipline:** Subtle blur (`backdrop-filter: blur(12px)`) reserved strictly for sticky navigation headers and floating operational strips.

---

## 6. Motion & Scroll Orchestration (Code Intent)
- **Orchestration Paradigm:** Scroll-driven and spring-decelerated.
- **Physics Values:** Deceleration curve `cubic-bezier(0.16, 1, 0.3, 1)` across all CSS transitions and Framer Motion components.
- **Staggered Enters:** Section children enter with progressive micro-delays (`0.1s`, `0.2s`, `0.35s`).
- **Scroll-Linked Elements:** Driven directly by mouse wheel delta via `scrollYProgress`, ensuring seamless scrub-back and scrub-forward capabilities without jarring resets.
