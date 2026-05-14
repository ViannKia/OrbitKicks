---
inclusion: always
---

# Orbit Kicks - Coding Rules

## Development Rules
- Setiap diskusi keputusan baru → UPDATE steering file yang relevan
- Jangan ulang jelaskan stack/structure (sudah ada di steering)
- Test 3D di Chrome/Firefox sebelum commit

## 3D Specific Rules
- Wajib pakai `Suspense` untuk semua komponen 3D
- Wajib ada fallback UI (bukan null)
- Jangan load lebih dari 3 models simultaneously
- Lighting minimal: Ambient + Directional + Environment map

## Animation Rules
- Micro-interactions: 150-200ms, ease-out
- Page transitions: 400-500ms, cubic-bezier
- Auto-rotation speed: 0.5 rpm (sangat slow, elegant)
- Jangan animasi yang trigger reflow (pakai transform & opacity)

## Prohibited Patterns (JANGAN)
- `any` type
- Inline styles (pakai Tailwind)
- `useEffect` untuk animasi (pakai Framer Motion/GSAP)
- Load model tanpa loading state

## Git Workflow
- Main branch: `main`
- Feature branches: `feature/nama-fitur`
- Commit: Conventional Commits
  - `feat:` new feature
  - `fix:` bug fix
  - `style:` 3D/UI styling
  - `perf:` performance

## Performance Budget
- Model 3D: < 8MB per file
- Bundle size: < 500KB (excluding models)
- Max 3 active post-processing effects