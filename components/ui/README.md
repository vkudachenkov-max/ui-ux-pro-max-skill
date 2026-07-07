# DottedSurface — Integration Guide

An animated Three.js particle field (a "dotted surface" wave) rendered as a
fixed, full-viewport background. Theme-aware via `next-themes` (light = black
dots, dark = light-grey dots).

> **Heads-up about this repository**
> `ui-ux-pro-max-skill` is a Python + Node CLI *skill toolkit*, **not** a
> React application. It has no Next.js/React runtime, no Tailwind build, and no
> app-level TypeScript config (the only TS here is the `cli/` installer). These
> files are provided as a **drop-in package** — copy them into a real
> shadcn/Tailwind/TypeScript project and follow the setup below.

---

## 1. Prerequisites — is your target project ready?

The component needs a **shadcn-style project** with **Tailwind CSS** and
**TypeScript**. If your project doesn't have these yet:

### New project (recommended)

```bash
# Next.js + TypeScript + Tailwind, then shadcn
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app
npx shadcn@latest init
```

### Existing project missing pieces

- **TypeScript:** `npm install -D typescript @types/react @types/node` then add a `tsconfig.json`.
- **Tailwind:** follow https://tailwindcss.com/docs/installation and make sure your global CSS imports Tailwind.
- **shadcn:** `npx shadcn@latest init` — this creates `components.json`, the `@/*` path alias, and `lib/utils.ts` (the `cn` helper).

`npx shadcn@latest init` will ask where components and the utils file live.
Accept the defaults (`@/components` and `@/lib/utils`) so the imports in these
files resolve unchanged.

## 2. Why `/components/ui` matters

shadcn's convention is that **primitive, reusable UI components live in
`components/ui/`** while feature/composed components live in `components/`.
Keeping this component in `components/ui/`:

- Makes the `@/components/ui/dotted-surface` import in `demo.tsx` (and future
  consumers) resolve correctly — the `ui` alias in `components.json` points here.
- Lets the shadcn CLI/registry manage, update, and de-duplicate primitives
  without touching your app-specific code.
- Keeps a clear boundary: `ui/` = generic building blocks, `components/` = your
  product's composed pieces.

If your project uses a *different* components directory, update the `ui` alias
in `components.json` and adjust the import paths accordingly.

## 3. Install runtime dependencies

```bash
npm install three next-themes
npm install -D @types/three
# cn() helper deps (installed automatically by `shadcn init`, listed for completeness)
npm install clsx tailwind-merge
```

## 4. Wrap your app in a ThemeProvider

`DottedSurface` reads the active theme via `useTheme()`, so `next-themes` must
provide it. In Next.js App Router (`app/layout.tsx`):

```tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
```

## 5. Use it

```tsx
import DemoOne from '@/components/ui/demo';
// or directly:
import { DottedSurface } from '@/components/ui/dotted-surface';

export default function Page() {
	return <DemoOne />;
}
```

---

## Component notes (answers to the integration questions)

- **Props / data:** `DottedSurface` accepts every native `<div>` prop except
  `ref` (`className`, `style`, `id`, event handlers, …). `className` is merged
  onto the fixed container via `cn`. No data props — the wave is fully
  self-generated.
- **State management:** none required. All animation state is local (Three.js
  refs). The only external dependency is the theme value from `next-themes`;
  changing the theme re-initialises the scene (dot color updates).
- **Assets:** **none.** The visual is procedurally generated with Three.js
  points — no images and no icons are needed, so no Unsplash/lucide assets apply.
- **Responsive behavior:** the canvas is `fixed inset-0` and resizes with the
  window (a `resize` listener updates the camera aspect + renderer size), so it
  always fills the viewport on any breakpoint. It is `pointer-events-none` and
  sits at `-z-1`, i.e. a non-interactive background layer.
- **Where to use it:** as a **page/section background** — landing-page heroes,
  auth screens, empty states, or splash pages — placed behind your foreground
  content. Because it's `position: fixed` and full-screen, use it once per view
  rather than nesting many instances.

### Performance / caveats

- Renders ~2,400 animated points (`AMOUNTX 40 × AMOUNTY 60`) every frame.
  Lower `AMOUNTX`/`AMOUNTY` or `size` for low-power devices.
- The container is `-z-1`; ensure your foreground content has an equal/higher
  stacking context so it stays clickable (the demo overlays with `absolute inset-0`).
- Uses `'use client'` — it must run on the client (WebGL/`window`).
