// Builds the site's HTML pages from src/.
//
//   node build.mjs
//
// src/pages/*.html   one file per page; written to the project root
// src/partials/*.html shared markup (header, footer, <head> tags, scripts)
// src/data.mjs       contact details, products, videos and gallery photos
//
// Template tags (each block tag must sit on its own line; it is indented to match):
//   {{> header}}           insert src/partials/header.html
//   {{productCards all}}   call helpers.productCards('all')
//   {{phoneTel}}           insert a value from the page context (inline)

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { site, products, videos, photos } from './src/data.mjs';

// Accept Windows (CRLF) or Unix line endings; output always uses \n.
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8').replace(/\r\n/g, '\n');

const escapeHtml = (text) => text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const jsonLd = (data) =>
    `<script type="application/ld+json">\n${JSON.stringify(data, null, 4)}\n</script>`;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const helpers = {
    // `featured` = the cards shown on the home page, `all` = the products page.
    productCards(which) {
        const list = which === 'featured' ? products.filter((p) => p.featured) : products;
        return list.map((p) => {
            const message = `Hello CEOT Farms, I'm interested in your ${p.inquiry}. What's available right now?`;
            const href = `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
            const cta = p.inquire
                ? `\n        <a class="productCta" href="${href}" target="_blank" rel="noopener noreferrer"><span class="btn btn--primary btn--small">Inquire on WhatsApp</span></a>`
                : '';
            return `<div class="servicesDiv productCard">
    <div>
        <i class="fa-solid ${p.icon}"></i>
        <h3>${escapeHtml(p.name)}</h3>
    </div>
    <div>
        <p>
            ${escapeHtml(p.description)}
        </p>${cta}
    </div>
</div>`;
        }).join('\n\n');
    },

    productsJsonLd() {
        return jsonLd({
            '@context': 'https://schema.org',
            '@graph': products.filter((p) => p.inquire).map((p) => ({
                '@type': 'Product',
                name: p.name,
                description: p.description,
                brand: { '@type': 'Brand', name: site.name },
                url: `${site.url}products.html`,
            })),
        });
    },

    // `featured` = the home page teaser, otherwise a group name from data.mjs.
    videoEmbeds(which) {
        const list = which === 'featured' ? videos.filter((v) => v.featured) : videos.filter((v) => v.group === which);
        return list.map((v) => {
            const short = v.group === 'shorts' ? ' videoEmbed--short' : '';
            return `<div class="videoEmbed${short}">
    <iframe src="https://www.youtube.com/embed/${v.id}" title="${escapeHtml(v.title)}" frameborder="0" allowfullscreen></iframe>
</div>`;
        }).join('\n');
    },

    videosJsonLd() {
        return jsonLd({
            '@context': 'https://schema.org',
            '@graph': videos.map((v) => ({
                '@type': 'VideoObject',
                name: v.title,
                description: v.group === 'shorts'
                    ? 'Quick clip from CEOT Sumbak Farms in Rufunsa, Zambia.'
                    : 'Farm video from CEOT Sumbak Farms in Rufunsa, Zambia.',
                thumbnailUrl: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
                embedUrl: `https://www.youtube.com/embed/${v.id}`,
                uploadDate: v.uploadDate,
                publisher: { '@type': 'Organization', name: site.name, url: site.url },
            })),
        });
    },

    // `teaser` = the three photos on the home page, `all` = the gallery page (opens the lightbox).
    galleryItems(which) {
        if (which === 'teaser') {
            return photos.filter((p) => p.teaser).map((p) => `<div class="galleryItem">
    <img src="images/${p.file}" alt="${escapeHtml(p.alt)}" loading="lazy" />
</div>`).join('\n');
        }
        return photos.map((p) => `<button class="galleryItem" type="button" aria-label="View larger image: ${escapeHtml(p.label)}">
    <img src="images/${p.file}" alt="${escapeHtml(p.alt)}" loading="lazy" />
</button>`).join('\n\n');
    },
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const indent = (text, prefix) =>
    text.split('\n').map((line) => (line ? prefix + line : line)).join('\n');

function render(template, ctx) {
    const blocks = template.replace(
        /^([ \t]*)\{\{\s*(>)?\s*([\w-]+)(?:\s+([\w-]+))?\s*\}\}[ \t]*$/gm,
        (_, prefix, isPartial, name, arg) => {
            if (isPartial) return indent(render(read(`./src/partials/${name}.html`), ctx).replace(/\n$/, ''), prefix);
            if (!helpers[name]) throw new Error(`Unknown helper {{${name}}}`);
            return indent(helpers[name](arg, ctx), prefix);
        },
    );
    return blocks.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
        if (!(key in ctx)) throw new Error(`Unknown value {{${key}}}`);
        return ctx[key];
    });
}

const pages = readdirSync(new URL('./src/pages/', import.meta.url)).filter((f) => f.endsWith('.html'));

for (const page of pages) {
    const source = read(`./src/pages/${page}`);
    // Link-preview tags (head.html) reuse the page's own <title> and meta description.
    const pageTitle = source.match(/<title>([^<]*)<\/title>/)?.[1];
    const pageDescription = source.match(/<meta name="description" content="([^"]*)"/)?.[1];
    if (!pageTitle || !pageDescription) throw new Error(`${page} needs a <title> and a meta description`);
    const ctx = {
        ...site,
        // Prefix for links to home-page sections: "#about" on the home page, "index.html#about" elsewhere.
        home: page === 'index.html' ? '' : 'index.html',
        pageUrl: page === 'index.html' ? site.url : `${site.url}${page}`,
        pageTitle,
        pageDescription,
    };
    const notice = `<!-- Built from src/pages/${page} by build.mjs. Edit that file and run "node build.mjs" instead of editing this one. -->`;
    const html = render(read(`./src/pages/${page}`), ctx).replace('<!DOCTYPE html>\n', `<!DOCTYPE html>\n${notice}\n`);
    writeFileSync(new URL(`./${page}`, import.meta.url), html);
    console.log(`built ${page}`);
}
