# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal website built with **React 19**, **TypeScript**, and **Vite**. The site features interactive visual effects including a cursor-following glow overlay that responds to proximity to window edges, and a page fold animation when the cursor approaches corners.

## Development Commands

```bash
npm run dev        # Start Vite dev server with HMR (http://localhost:5173)
npm run build      # TypeScript compilation + Vite production build
npm run lint       # Run ESLint on all TS/TSX files
npm run preview    # Preview the built production bundle locally
```

**Running a single file or targeted checks:**
- `npx eslint src/App.tsx` - Lint a specific file
- `npm run build && npm run preview` - Test production build locally before deploy

## Code Architecture

### Directory Structure

```
src/
├── App.tsx              # Main component with page fold detection
├── GlowOverlay.tsx      # Cursor-tracking glow effect component
├── main.tsx             # React entry point (mounts to #root in index.html)
├── App.css              # Styling for App and glow effects
├── index.css            # Global styles (typography, layout)
└── vite-env.d.ts        # Vite type definitions
```

### Key Components

**App.tsx**: Root component that:
- Tracks mouse position and detects when cursor is within 20px of window corners
- Applies fold animations when cursor approaches corners (`fold-top-left`, `fold-top-right`, etc.)
- Renders the page content and GlowOverlay

**GlowOverlay.tsx**: Stateful component that:
- Listens to global `mousemove` events
- Detects proximity to window edges (top, bottom, left, right) within 55px (25px threshold + 30px fade distance)
- Calculates opacity fade as cursor approaches edge
- Renders a radial gradient glow positioned at cursor coordinates using CSS variables
- Only renders when cursor is near an edge (performance optimization)

### Styling Notes

- **Color scheme**: Cream background (#fbf9ee), dark text (#111), warm glow overlay (rgba(255, 224, 102, ...))
- **Typography**: Source Serif Pro (serif family, weights 300/400/600) loaded from Google Fonts
- **Glow effects**: CSS custom properties (`--cursor-x`, `--cursor-y`, `--glow-opacity`) enable smooth cursor-tracking effects without repainting the DOM
- **Responsive**: Flex layout with viewport-relative padding (5vw, 10vh) for responsive spacing

## TypeScript & Build Configuration

- **Target**: ES2022 (app), ES2023 (build config)
- **Strict mode**: Enabled with `noUnusedLocals`, `noUnusedParameters`, and other strict checks
- **JSX**: React 17+ syntax with automatic `jsx` transform
- **Module resolution**: Bundler mode for ESM compatibility
- Two separate tsconfigs: `tsconfig.app.json` (src) and `tsconfig.node.json` (build scripts)

## ESLint Configuration

- Extends TypeScript ESLint recommended rules
- React Hooks plugin enforces Rules of Hooks
- React Refresh plugin detects components suitable for HMR
- Ignores `dist/` directory

## Performance Considerations

- **GlowOverlay** only renders when `visible` is true (near an edge), avoiding unnecessary DOM updates
- CSS radial gradients leverage GPU for smooth animations
- CSS variables allow cursor tracking without layout recalculation
- React Fast Refresh enabled for instant HMR during development

## Common Development Tasks

**Adding a new component:**
1. Create `src/ComponentName.tsx` with TypeScript interfaces
2. Import and use in `App.tsx`
3. Add styles to `App.css` or create `ComponentName.css`
4. Run `npm run lint` to catch any type or style issues

**Debugging event listeners:**
- GlowOverlay and App both attach `mousemove` listeners
- GlowOverlay cleans up its listener on unmount
- Check console for performance issues if mouse events feel sluggish

**Updating styles:**
- Global styles go in `index.css`
- Component-specific styles in `App.css`
- CSS custom properties in use: `--cursor-x`, `--cursor-y`, `--glow-opacity`
- Avoid fixed colors; ensure they work with the cream background and serif typography
