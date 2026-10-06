# CEOT Sumbak Farms website

Static site: `index.html`, `products.html`, `gallery.html`, `videos.html`, plus `styles.css`, `index.js` and `images/`.
Upload the project root as-is; no server-side code.

## Editing pages

The four `.html` files in the root are **generated** — edit the sources in `src/` and rebuild:

```bash
node build.mjs
```

| To change… | Edit |
|---|---|
| Phone, WhatsApp, email, social links | `src/data.mjs` → `site` |
| Products (cards on Home + Products page, Google product data) | `src/data.mjs` → `products` |
| YouTube videos (embeds + Google video data) | `src/data.mjs` → `videos` |
| Gallery photos | `src/data.mjs` → `photos` |
| Header / mobile menu / nav links | `src/partials/header.html`, `src/partials/nav-links.html` |
| Footer | `src/partials/footer.html` |
| Shared `<head>` tags and scripts | `src/partials/head.html`, `src/partials/scripts.html` |
| Link previews (WhatsApp, Facebook…) | Automatic from each page's `<title>` and meta description; image is `images/og-image.jpg` (1200×630) |
| Page-specific content | `src/pages/<page>.html` |

Needs Node.js 18+; no packages to install.

## Reusable pieces

- **Section heading:** `sectionHeader`, `sectionHeader__eyebrow`, `sectionHeader__title` (wrap the accent word in `<span>`), `sectionHeader__intro`. Add `sectionHeader--onDark` on dark backgrounds.
- **Buttons:** `<a href="…"><span class="btn btn--primary">Label</span></a>`, optionally with `btn--small`, `btn--large`, `btn--youtube`. Put it in a `<div class="ctaRow">` to centre it.
- **Auto-updating years:** `<span data-years-since="2016">10</span>` and `<span data-current-year>2026</span>` are recalculated by `index.js` on page load.
- **Dark mode:** colours live in `styles.css` under `html.dark`.
