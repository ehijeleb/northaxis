# Northaxis Integrated Services — Design System (MASTER)

> Single source of truth for the visual system. Generated from `ui-ux-pro-max` (CIP brief,
> Consulting / Swiss-Minimal direction) and **reconciled with the locked brand tokens in
> `NORTHAXIS_BUILD_INSTRUCTIONS.md` Section 2**. Where the generator and the brief disagree,
> **our palette and fonts win**; we keep the generator's anti-pattern discipline and checklist.
>
> Status: established at **Step 0**. Update as primitives land (Steps 2–5).

---

## 1. North star

Audience: **government procurement officers and senior public-sector decision-makers** in Edo
State and across Nigeria. Register: **calm, credible, locally rooted, quiet intellectual weight**
on the consultancy layer. It should sit beside international procurement portals without
embarrassment. **Not a startup landing page.**

The generator independently classified this client as **Consulting → Corporate / Swiss
International (minimal)**, mood **professional / expert**, typography **grid-based sans**. That
agrees with the brief's north star and reinforces the restraint below.

**Structural law (overrides convenience):** the homepage **leads with the company promise**, not a
list of services. Services sit one level deeper. Do not violate this.

---

## 2. Colour tokens (LOCKED — exact values)

| Token | Hex | Use |
|---|---|---|
| `--color-teal` (primary) | `#0F6E56` | brand, heading accents, CTAs, logo |
| `--color-bg` (warm off-white) | `#F9F9F7` | page backgrounds, section fills |
| `--color-teal-light` | `#E1F5EE` | callouts, highlight strips, **consultancy** backgrounds |
| `--color-ink` (near-black) | `#1A1A1A` | body text, primary headings |
| `--color-grey` (mid grey) | `#5F5E5A` | secondary text, captions, metadata |
| `--color-border` (light grey) | `#CCCCCC` | borders, dividers, card outlines |

> Reconciliation note: the generator proposed a generic `#DC2626` red accent on white/black. We
> **reject** that accent and the neutral set in favour of the locked teal system above. The only
> idea carried over from the generator is the *Swiss-minimal restraint* (precise, matte, clean
> grid), not its colours.

**Logo bars (ascending bars):**
- Light bg: Bar 1 short `#B4B2A9` · Bar 2 medium `#2C2C2A` · Bar 3 tall `#0F6E56` + cap `#5DCAA5`
- Dark bg: white bars, teal `#5DCAA5` cap.

**Contrast (must hold ≥ 4.5:1 for text):**
- ink `#1A1A1A` on bg `#F9F9F7` ✓ (very high)
- grey `#5F5E5A` on bg `#F9F9F7` ✓ (~5.8:1) — OK for body/secondary, not for <16px on busy fills
- teal `#0F6E56` on bg `#F9F9F7` ✓ (~5.2:1) — OK for text and large UI
- white on teal `#0F6E56` ✓ (~5.2:1) — primary button text
- teal `#0F6E56` on teal-light `#E1F5EE` ✓ — consultancy callouts
- Do **not** put grey on teal or teal on grey (fails). Verify any new pairing before shipping.

---

## 3. Typography

- **Inter** (variable), self-hosted via `@fontsource-variable/inter`. No render-blocking Google
  Fonts. Headings + body.
  - H1/H2 **bold**; H3 / card titles **medium**; body **regular**.
  - Body **min 16px desktop / 15px mobile**. Line-height ~1.6 body, ~1.2 headings.
- **Source Serif 4** (light/regular), self-hosted via `@fontsource/source-serif-4`. **Consultancy
  only** — pull quotes and advisory intros. Use sparingly for intellectual register.
- No decorative, script, or condensed fonts. No second sans.

Type scale (rem, mobile → desktop via clamp where useful):
- Display/H1 ~2.0 → 3.0 · H2 ~1.6 → 2.25 · H3 ~1.25 → 1.5 · body 1.0 (15/16px) · small 0.875.

---

## 4. Motion (Emil Kowalski discipline)

- Fast and purposeful. Entrances **ease-out**; interactive elements a spring-like feel.
- Durations **150–300ms** for hover/focus/reveal.
- Motion reinforces hierarchy, never decorates. The **one earned metaphor**: the ascending bars
  (northward growth) — a subtle staggered rise, **once, on first load**, on logo/hero only.
- **Everything gated behind `prefers-reduced-motion: reduce`** with a static fallback.
- Prefer CSS transitions + Astro View Transitions. `motion/react` only inside a React island and
  only when CSS cannot express it. Keep JS off the critical path.
- Have the `emil-design-eng` skill (installed at `.agents/skills/emil-design-eng`) review any
  animation before it ships.

---

## 5. Anti-slop "do not" list (hard rules)

- ✗ teal-to-purple / rainbow gradient heroes; no "AI purple/pink".
- ✗ glassmorphism, neumorphism, floating 3D blobs, aurora mesh backgrounds.
- ✗ auto-counting stat tickers; ✗ decorative "icon in a rounded square" grids.
- ✗ giant centred hero with a single vague verb — the hero leads with the **specific promise**.
- ✗ emoji as icons — use **Lucide** SVG, one consistent set.
- ✗ motion for motion's sake.

---

## 6. Layout & spacing

- Swiss-minimal grid: generous whitespace, clear column structure, strong left-alignment, few
  type sizes, restrained accent use (teal earns attention because it is rare).
- Mobile-first. Breakpoints: **375 / 768 / 1024 / 1440**.
- Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96. Section vertical rhythm ~64–96 desktop.
- Max content width ~1200–1280px; comfortable measure (~66ch) for body text.
- `cursor-pointer` on every clickable. Visible focus ring on every interactive element.

---

## 7. Component intent (built in Steps 2–5)

`Logo` (2 variants) · `Header`+nav+"What we do" dropdown (consultancy after a divider) · `Footer` ·
floating WhatsApp · cookie banner · `Button` · `Card` · `Section` · `Pill`/`Tag` · `PullQuote`
(serif, consultancy) · `CtaBand` · `StepList` · form fields (`TextField`, `TextArea`, `Select`,
`FormStatus`). Documented on `/__gallery`.

Consultancy is **cross-cutting**, never a fourth service: cue it with `--color-teal-light`
backgrounds and the dropdown divider.

---

## 8. Pre-delivery checklist (run at Step 23)

- [ ] Keyboard nav everywhere; focus always visible.
- [ ] Contrast ≥ 4.5:1 on all text (see §2).
- [ ] `prefers-reduced-motion` honoured site-wide; static fallbacks present.
- [ ] No emoji icons; Lucide only.
- [ ] `cursor-pointer` on all clickables.
- [ ] Responsive at 375 / 768 / 1024 / 1440 with no overflow or CLS.
- [ ] Hero leads with the promise (structural law).
- [ ] Consultancy reads as cross-cutting, not a 4th service.
- [ ] Self-hosted fonts only; no render-blocking font request.
- [ ] PageSpeed mobile 80+, usable < 3s on Slow 3G, CLS ~0.
- [ ] Emil Kowalski skill has reviewed all motion.

---

## Provenance
- Generator: `ui-ux-pro-max` v2.5.0 CIP brief — query "government procurement consulting B2G trust
  authority accessible ethical", brand "Northaxis Integrated Services" → Consulting / Swiss-Minimal.
- Animation skill: `emilkowalski/skill` (`emil-design-eng`) installed at `.agents/skills/`.
- Tokens & structure: `NORTHAXIS_BUILD_INSTRUCTIONS.md` Sections 1–4 (authoritative).
