# RKM Foundation — Animation Standards (project-local skill)

## Library roles (decision tree)
1. **CSS-only FIRST** — hovers, focus, accordions, fades ≤300ms. Zero JS cost. (Current: Tailwind transitions + custom Reveal.tsx.)
2. **Framer Motion** — React component transitions: drawer, modals, page elements, AnimatePresence exits, layout animations. Declarative, respects React lifecycle.
3. **GSAP (+ScrollTrigger)** — complex scroll storytelling timelines only (e.g., Tobler story chapter, impact counters). Never for simple reveals. Import per-route (dynamic) to keep base bundle clean.
4. **Lenis** — smooth scrolling ONLY if a scroll-story section ships; must sync with ScrollTrigger via lenis.on('scroll', ScrollTrigger.update). Disable on mobile + reduced-motion.

## Hard rules (production)
- **prefers-reduced-motion: every animation gated.** CSS: motion-reduce: variants. JS: check matchMedia before init; render final state statically.
- **Animate only transform + opacity** (GPU-composited). NEVER animate width/height/top/margin (layout) or box-shadow/filter on scroll (paint).
- **No layout shift:** reserve space; animate in-place; will-change only during animation, removed after.
- **Scroll jank:** passive listeners; no synchronous reads in scroll handlers; use IntersectionObserver/ScrollTrigger, never raw onScroll math.
- **Mobile:** durations ≤400ms; reduce parallax to 0; test on mid-tier Android; total JS budget for animation libs ≤40KB gzip on routes that use them.
- **Budgets:** Lighthouse Perf ≥95 maintained; CLS <0.05; INP <200ms. Any animation that breaks these gets cut.
- **Accessibility:** no autoplaying motion >5s without pause; no flashing >3/s; focus states never animated away; screen-reader content never opacity-0 permanently (use aria-hidden on decorative layers).
- **Patterns:** stagger ≤80ms between siblings, max 200ms total delay; ease-out for entrances ([0.16,1,0.3,1]); counters via GSAP only when value is real data, never fake numbers.
- Existing Reveal.tsx (IO + Tailwind) stays for simple section reveals — do NOT replace with Framer Motion (works, lighter).
