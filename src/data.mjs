// Site content shared across pages. Edit here, then run `node build.mjs`.

export const site = {
    name: 'CEOT Sumbak Farms',
    url: 'https://ceotfarms.com/',
    phoneTel: '+260977681624',
    whatsappUrl: 'https://wa.me/260977681624',
    // WhatsApp chat with a ready-typed message, used by the home page's main button.
    whatsappGoatsUrl: 'https://wa.me/260977681624?text=' + encodeURIComponent("Hello CEOT Farms, I'm interested in your goats. What's available right now?"),
    email: 'beadade58@hotmail.com',
    facebookUrl: 'https://www.facebook.com/share/ciAH7M63VCaBFTGe/?mibextid=qi2Omg',
    youtubeUrl: 'https://www.youtube.com/@CEOTFarms',
};

// featured: also shown on the home page. inquire: has a WhatsApp button and is listed for Google as a Product.
// inquiry: fills the ready-typed WhatsApp message ("I'm interested in your …").
export const products = [
    {
        name: 'Goats',
        inquiry: 'goats',
        icon: 'fa-paw',
        description: 'Our specialty and best seller. Award-winning goat breeds — winner of Best Goat Breed in Zambia — known for strong health, good size, and excellent breeding quality. 2,000+ goats on the farm, available locally and for international shipping.',
        featured: true,
        inquire: true,
    },
    {
        name: 'Dorper Sheep',
        inquiry: 'Dorper sheep',
        icon: 'fa-paw',
        description: 'Top-quality Dorper sheep, valued for hardiness and excellent meat production. Currently raising 300+ sheep.',
        featured: true,
        inquire: true,
    },
    {
        name: 'Eggs',
        inquiry: 'eggs',
        icon: 'fa-egg',
        description: 'Fresh, top-grade eggs from our layers, available for local supply. Contact us for current availability and pricing.',
        featured: true,
        inquire: true,
    },
    {
        name: 'Poultry',
        inquiry: 'poultry',
        icon: 'fa-drumstick-bite',
        description: 'High-quality layers and broilers, raised with care. Contact us for current stock and pricing.',
        featured: false,
        inquire: true,
    },
    {
        name: 'Local & International Shipping',
        icon: 'fa-shop',
        description: 'We sell locally and ship goats internationally. Message us on WhatsApp to arrange delivery to your country.',
        featured: false,
        inquire: false,
    },
];

// group: 'farm' (Farm Videos) or 'shorts' (Quick Clips). featured: shown on the home page.
// title and uploadDate must match the video on YouTube; both are used in Google's video data.
export const videos = [
    { id: '3MMdaybJ1Vo', title: '2026 Zonal Show', group: 'farm', featured: true, uploadDate: '2026-06-04T00:54:00-07:00' },
    { id: 'glzJDC4p_Vs', title: 'WHAT TO FEED YOUR GOATS PART 1', group: 'farm', uploadDate: '2026-05-18T01:19:24-07:00' },
    { id: 'gvaLqj_SRkE', title: 'FARM MANAGEMENT SYSTEMS: HOW TO TAKE CARE OF YOUR BABY GOATS (KIDS)', group: 'farm', uploadDate: '2026-04-28T08:08:44-07:00' },
    { id: 'RvNfuZlkkDk', title: '#nicegoats#CEOT Farm', group: 'shorts', uploadDate: '2025-07-26T15:00:20-07:00' },
    { id: 'zlER_wbvj3E', title: 'Do not forget to leave a like', group: 'shorts', uploadDate: '2025-10-25T09:17:48-07:00' },
    { id: 'IOLdKplGidI', title: 'October 22, 2025', group: 'shorts', uploadDate: '2025-10-22T01:00:19-07:00' },
];

// Files live in images/. label: read out by screen readers on the gallery's "view larger" buttons.
// teaser: also shown on the home page.
export const photos = [
    {
        file: 'ceot-farm-1.jpg',
        alt: 'Daily farm life and animal care at CEOT Sumbak Farms in Rufunsa, Zambia',
        label: 'Daily farm life at CEOT Sumbak Farms',
        teaser: true,
    },
    {
        file: 'ceot-farm-2.jpg',
        alt: 'Sustainable goat and Dorper sheep farming at CEOT Sumbak Farms in Rufunsa, Zambia',
        label: 'Sustainable farming at CEOT Sumbak Farms',
        teaser: true,
    },
    {
        file: 'ceot-farm-3.jpg',
        alt: 'Goats and livestock grazing at CEOT Sumbak Farms in Rufunsa, Zambia',
        label: 'Goats and livestock grazing',
        teaser: true,
    },
];
