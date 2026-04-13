# Security Audit Report

**Project:** Jabez Portfolio (Next.js 16 + React 19)
**Date:** April 13, 2026
**Overall Risk:** Low (static portfolio, no API routes, no auth)

---

## Priority Legend

| Priority | Meaning |
|----------|---------|
| P0 | Fix immediately — active vulnerability |
| P1 | Fix soon — security gap that becomes critical when features are added |
| P2 | Fix when convenient — best practice hardening |
| P3 | Informational — no immediate action needed |

---

## Findings

### P1 — Missing Security Headers

**File:** `next.config.ts`
**Issue:** No HTTP security headers are configured. The site is missing protections against clickjacking, MIME sniffing, and referrer leakage.

**Fix:** Added the following headers to `next.config.ts`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**Status:** ✅ DONE (April 13, 2026)

---

### P1 — Contact Form Backend Not Yet Secured

**File:** `components/Contact/Contact.tsx`
**Issue:** The form has client-side Zod validation but currently only `console.log`s the data. When a real backend is wired up, the following are required:

- [ ] Duplicate the Zod schema in the API route (server-side validation)
- [ ] Add rate limiting (e.g. `@upstash/ratelimit` or Vercel Edge middleware)
- [ ] Sanitize all inputs before forwarding via email
- [ ] Add CSRF protection if using cookie-based sessions

**Mitigations applied:**

- Added `sanitizeInput()` to strip HTML entities from all string fields
- Added client-side rate limiting (max 3 submissions per 60s window)
- Added `.max()` constraints to all Zod fields to prevent oversized payloads
- Added inline comments documenting required server-side steps

**Status:** ✅ PARTIALLY DONE — client-side hardening complete. Server-side validation required when backend is added. (April 13, 2026)

---

### P2 — Personal Information (PII) Exposed in Client Bundle

**File:** `data/profile.ts`
**Issue:** Real email and phone number were hardcoded and shipped in the JavaScript bundle.

**Fix applied:**

- Replaced `email` string with `emailParts` array — assembled at runtime via `buildEmail()` to defeat simple scrapers
- Removed `phone` number entirely from the public bundle
- Updated all components (`Contact`, `Sidebar`, `MenuOffcanvas`) to use `buildEmail()`

**Status:** ✅ DONE (April 13, 2026)

---

### P2 — Deprecated Dependency: `@studio-freight/lenis`

**File:** `package.json`
**Issue:** `@studio-freight/lenis` (v1.0.42) has been renamed to `lenis`. Deprecated packages stop receiving security patches.

**Fix:** Removed the deprecated package. No source files were importing it, so it was a dead dependency.

**Status:** ✅ DONE (April 13, 2026)

---

### P3 — Memory Leak in Custom Cursor (Client-Side DoS)

**File:** `components/Cursor/Cursor.tsx`
**Issue:** A `MutationObserver` watched the entire `document.body` and re-attached `mouseenter`/`mouseleave` listeners on every DOM mutation without removing previous ones.

**Fix:** Replaced per-element listeners with event delegation on `document` using `mouseover`/`mouseout`. Removed the `MutationObserver` entirely. Added a `WeakSet` ref for cleanup tracking.

**Status:** ✅ DONE (April 13, 2026)

---

### P3 — No `images.remotePatterns` Configured

**File:** `next.config.ts`
**Issue:** Not currently a problem since all images are local (`/images/...`). If remote images are added later, configure `remotePatterns` in `next.config.ts` to whitelist only trusted domains.

---

## Passed Checks

| Check | Status |
|-------|--------|
| No `dangerouslySetInnerHTML` usage | Pass |
| No `eval()` or `Function()` calls | Pass |
| No hardcoded API keys or secrets | Pass |
| `.env*` files excluded in `.gitignore` | Pass |
| All `target="_blank"` links have `rel="noopener noreferrer"` | Pass |
| No API routes (minimal server attack surface) | Pass |
| Modern, up-to-date core dependencies | Pass |
| Client-side form validation with Zod | Pass |
| Next.js `Image` component used (no raw `<img>`) | Pass |

---

## Action Summary

| # | Finding | Priority | Status |
|---|---------|----------|--------|
| 1 | Add security headers to `next.config.ts` | P1 | ✅ DONE |
| 2 | Secure contact form backend when implemented | P1 | ✅ PARTIALLY DONE (client-side hardening complete) |
| 3 | Obfuscate or remove public PII | P2 | ✅ DONE |
| 4 | Replace deprecated `@studio-freight/lenis` | P2 | ✅ DONE |
| 5 | Fix cursor memory leak | P3 | ✅ DONE |
| 6 | Configure `images.remotePatterns` if needed | P3 | N/A (all images local) |
