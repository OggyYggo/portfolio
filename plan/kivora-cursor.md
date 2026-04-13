# Cursor — Component Guide

> Part of Phase C (Polish) — Final component. The finishing touch.

---

## File Structure

```
src/
├── components/
│   └── Cursor/
│       └── Cursor.tsx
```

---

## Dependencies

No shadcn components needed. Pure GSAP + CSS.

---

## Step 1 — Build the Cursor Component

**File:** `components/Cursor/Cursor.tsx`

```tsx
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const circle = circleRef.current
    if (!cursor || !circle) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Follow mouse
    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // Scale up on hoverable elements
    const onEnter = () => {
      if (isHovering.current) return
      isHovering.current = true
      gsap.to(circle, {
        scale: 2.5,
        opacity: 0.4,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      isHovering.current = false
      gsap.to(circle, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.in',
      })
    }

    // Hide cursor when it leaves the window
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        gsap.to(cursor, { opacity: 0, duration: 0.2 })
      }
    }

    const onMouseIn = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 })
    }

    // Attach hover listeners to interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [data-cursor="hover"], input, textarea, label'
      )
      targets.forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addHoverListeners()
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onMouseOut)
    document.addEventListener('mouseenter', onMouseIn)

    // Re-attach when DOM changes (e.g. filter updates in Portfolio)
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onMouseOut)
      document.removeEventListener('mouseenter', onMouseIn)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      id="cursor"
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <div
        ref={circleRef}
        className="w-5 h-5 rounded-full border-2 border-primary bg-primary/20 backdrop-blur-sm"
      />
    </div>
  )
}
```

---

## Step 2 — Add Cursor to Layout

Mount it once globally in `app/layout.tsx` — it will work across all pages:

```tsx
// app/layout.tsx
import Preloader from '@/components/Preloader/Preloader'
import Header from '@/components/Header/Header'
import Cursor from '@/components/Cursor/Cursor'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Cursor />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

---

## Step 3 — Add Custom Hover Targets (Optional)

For any element that isn't a link or button but should still trigger the cursor scale effect, add `data-cursor="hover"`:

```tsx
<div data-cursor="hover" className="project-card">
  ...
</div>
```

---

## Step 4 — Disable on Mobile

The custom cursor only makes sense on desktop. Hide it on touch devices with CSS:

```css
/* app/globals.css */
@media (pointer: coarse) {
  #cursor {
    display: none;
  }

  body {
    cursor: auto !important;
  }
}
```

---

## Cursor Variants (Optional Upgrades)

### Variant A — Arrow on links
Change the cursor shape when hovering a link:

```tsx
const onLinkEnter = contextSafe(() => {
  gsap.to(circle, { scale: 3, borderColor: 'transparent', backgroundColor: 'hsl(var(--primary))', opacity: 0.8, duration: 0.3 })
})
```

### Variant B — Text label cursor
Show a text label inside the cursor on certain elements:

```tsx
// Add a label ref inside the cursor div
<div ref={cursorRef} ...>
  <div ref={circleRef} ... />
  <span ref={labelRef} className="absolute text-[8px] font-bold text-primary opacity-0">
    VIEW
  </span>
</div>

// Then animate it on hover of portfolio cards:
gsap.to(labelRef.current, { opacity: 1, duration: 0.2 })
```

### Variant C — Magnetic effect on buttons
Buttons pull the cursor slightly toward their center:

```tsx
const onButtonMove = (e: MouseEvent, el: Element) => {
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  gsap.to(cursorRef.current, {
    x: e.clientX + (cx - e.clientX) * 0.3,
    y: e.clientY + (cy - e.clientY) * 0.3,
    duration: 0.3,
  })
}
```

---

## Checklist

- [ ] `Cursor.tsx` created
- [ ] Cursor imported and added to `app/layout.tsx`
- [ ] Custom cursor appears and follows the mouse
- [ ] Default browser cursor is hidden
- [ ] Cursor scales up on hover over links and buttons
- [ ] Cursor scales back down on mouse leave
- [ ] Cursor fades out when mouse leaves the window
- [ ] Cursor fades back in when mouse re-enters
- [ ] Mobile users see normal cursor (`@media pointer: coarse`)
- [ ] Portfolio filter cards trigger hover effect after filtering

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Default cursor still showing | Check `document.body.style.cursor = 'none'` is inside `useEffect` |
| Cursor jumps on first load | Initial position is `top: 0, left: 0` — moves to mouse on first `mousemove` |
| Cursor not scaling on new elements | `MutationObserver` re-attaches listeners — check it's observing `document.body` |
| Cursor visible on mobile | Add `@media (pointer: coarse)` CSS to hide `#cursor` on touch devices |
| Cursor appears behind modals | Increase `z-index` above shadcn Sheet/Dialog (which uses `z-50`) — use `z-[9999]` |

---

## 🎉 All Components Complete!

You've now built the full Kivora portfolio in Next.js:

```
Phase A — Shell
  ✅ Preloader
  ✅ Header + MenuOffcanvas
  ✅ Sidebar

Phase B — Content
  ✅ About
  ✅ Skills
  ✅ Experience

Phase C — Polish
  ✅ Portfolio
  ✅ Contact
  ✅ Cursor
```

---

## Final Steps Before Launch

1. **Fill all data files** — `profile.ts`, `skills.ts`, `experience.ts`, `projects.ts`
2. **Add real images** — profile photo and project screenshots in `public/images/`
3. **Connect email service** — Resend or Formspree in the Contact form
4. **Set up environment variables** — `RESEND_API_KEY` in `.env.local`
5. **Test on mobile** — check all sections stack correctly
6. **Run a Lighthouse audit** — aim for 90+ on Performance, Accessibility, SEO
7. **Deploy to Vercel** — push to GitHub and connect the repo

```bash
# Final checks before deploy
npm run build     # should have zero errors
npm run lint      # fix any warnings
vercel            # deploy!
```

---

> Built with: Next.js · TypeScript · Tailwind CSS · shadcn/ui · GSAP · Framer Motion · Lenis
