# Sumant Saini — Portfolio

A dark, futuristic personal portfolio for **Sumant Saini**, Data Science & AI
undergraduate at IIT Guwahati. Built as a real Next.js application, not a
template.

## Stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19       |
| Language   | TypeScript (strict)                      |
| Styling    | Tailwind CSS v4 (CSS-first `@theme`)     |
| Animation  | Framer Motion for reveals, CSS for loops |
| Background | Hand-written canvas particle network     |
| Fonts      | Space Grotesk (display) + Inter (body)   |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Development server                    |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | ESLint (next/core-web-vitals + TS)    |
| `npm run typecheck` | `tsc --noEmit`                        |

## Project structure

```
app/
  layout.tsx           Root shell, fonts, metadata
  page.tsx             Section composition
  globals.css          Design tokens + component layer
components/
  Navbar.tsx           Glass pill nav, scroll state, active-section tracking
  Hero.tsx             Headline reveal, CTAs, stat band
  ParticleField.tsx    Cursor-reactive canvas network
  OrbVisual.tsx        Pure-CSS orbiting hero centrepiece
  About.tsx            Bio + profile panel
  Skills.tsx           Orbit constellation + grouped grid
  Projects.tsx         Spotlight project cards with hover detail
  ProjectVisual.tsx    Per-project abstract motif
  Achievements.tsx     Kaggle + Yoga cards
  Contact.tsx          Email / GitHub / LinkedIn + contact form
  ContactForm.tsx      Name / email / message form
  SpotlightCard.tsx    rAF-throttled cursor spotlight wrapper
  Magnetic.tsx         Cursor-magnetic button wrapper
  CustomCursor.tsx     Dot + trailing ring cursor
  ScrollProgress.tsx   Top reading-progress bar
  Reveal.tsx           Shared scroll-reveal primitives + easing
  SectionHeading.tsx   Eyebrow / title / description
  Footer.tsx
app/api/contact/
  route.ts             SMTP endpoint behind the contact form
lib/
  data.ts              All site content in one place
```

## Editing content

Everything user-facing lives in [`lib/data.ts`](lib/data.ts) — profile, skills,
projects, achievements and social links. Components stay presentational, so
content changes never require touching JSX.

## Performance notes

- The particle canvas caps device pixel ratio at 1.75, scales particle count
  with viewport area, and runs one `requestAnimationFrame` loop.
- Pointer events only record coordinates; painting happens on the rAF tick.
- The canvas loop stops when the hero scrolls out of view or the tab is hidden.
- The grain overlay is a single fixed composited layer.
- Animations are restricted to `transform` / `opacity` to stay off the layout
  and paint critical paths.

## Accessibility

- `prefers-reduced-motion` collapses every animation, disables the custom
  cursor, and renders the particle field as a single static frame.
- The custom cursor only activates for fine pointers, and the native cursor is
  restored on pointer-leave, tab-hide, and unmount.
- Visible focus rings on all interactive elements, plus a skip-to-content link.
- Hover-revealed project detail is always expanded below `lg`, so touch users
  never lose content.

## Contact form (Gmail SMTP)

The form posts to `app/api/contact`, which relays the message through Gmail SMTP
to your inbox.

1. Copy `.env.example` to `.env`.
2. Fill in the three values:

| Variable    | Meaning                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| `SMTP_USER` | Gmail account the message is sent from                                  |
| `SMTP_PASS` | A Google **App Password** (16 chars) — your normal password is rejected |
| `MAIL_TO`   | Inbox that receives the messages                                        |

Get an app password at: Google Account → Security → 2-Step Verification → App
passwords. Spaces in the value are stripped automatically.

If any of the three is missing the endpoint answers `503` and the form reports
it, rather than failing silently.

Endpoint guards: server-side validation, length caps, CR/LF stripping (header
injection), HTML escaping, a hidden honeypot field, and a per-IP throttle of
5 messages per 10 minutes.

## Deploying to Vercel

```bash
npx vercel
```

Add `SMTP_USER`, `SMTP_PASS` and `MAIL_TO` to the Vercel project's environment
variables. `.env` is git-ignored and is never uploaded.

## Before you publish

Still placeholders:

- `lib/data.ts` → each `projects[].links[].href`. They currently point at the
  GitHub profile; point them at the individual repos and live demos.
- `app/layout.tsx` → `siteUrl` in `metadata`.
