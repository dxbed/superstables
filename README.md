# Superstables — landing page

Marketing site for Superstables, the payment router for AI agents. Next.js (App Router) + TypeScript, no CSS framework.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `app/layout.tsx` | Fonts (`next/font`: Bricolage Grotesque, Figtree, JetBrains Mono), metadata / Open Graph |
| `app/globals.css` | The whole design system — dark tokens in `:root`, light tokens under `[data-theme="light"]` / `prefers-color-scheme: light`; code surfaces stay dark in both |
| `app/page.tsx` | Section order |
| `components/` | One component per section; `Terminal`, `Reveal`, `CopyButton`, `WaitlistForm`, `ThemeToggle` are client components. `Logo` exports `LogoMark` (dark / light / auto) |
| `content/site.ts` | Editable copy and data: rails, roadmap phases, guards, stats, links |
| `app/api/waitlist/route.ts` | Waitlist endpoint — validates and logs; replace `persist()` with your CRM / DB |
| `_reference/index-static.html` | The original single-file prototype, kept for reference |

## Before launch

- Replace placeholder `#` links in `content/site.ts` (GitHub, npm, PyPI, MCP, blog, X, contact).
- Wire `persist()` in the waitlist route to a real destination.
- Add an Open Graph image (`app/opengraph-image.png`). Favicon is `app/icon.svg`; brand assets live in `public/brand/` and are previewed at `/brand`.
- Decide on the product name if it will differ from the Superstables brand.
