

let hamburgerBtn = document.getElementById("hamburgerBtn");
let hamburgerIcon = hamburgerBtn.querySelector('i');
let sideMenu = document.getElementById('sideMenu')

let showingSideMenu = false;

const DARK_MODE_KEY = 'ceot-dark-mode';

function openSideMenu() {
    sideMenu.classList.add('is-open');
    sideMenu.setAttribute('aria-hidden', 'false');
    showingSideMenu = true;
    hamburgerIcon.classList.remove('fa-bars');
    hamburgerIcon.classList.add('fa-plus');
    hamburgerIcon.style.rotate = '45deg';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
}

function closeSideMenu() {
    sideMenu.classList.remove('is-open');
    sideMenu.setAttribute('aria-hidden', 'true');
    hamburgerIcon.style.rotate = '0deg';
    hamburgerIcon.classList.add('fa-bars');
    hamburgerIcon.classList.remove('fa-plus');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open menu');
    showingSideMenu = false;
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', ()=>{
    if (showingSideMenu) closeSideMenu(); else openSideMenu();
})

// Close the menu when a link in it is tapped (otherwise it stays over the page
// after jumping to a section on the same page).
sideMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        if (showingSideMenu) closeSideMenu();
    });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let themeToggle = document.getElementById('themeToggle');
let moon = document.getElementById('moon');
let header = document.getElementById('header');

// Dark mode colours live in styles.css under `html.dark`. The class is applied
// before first paint by the inline script in each page's <head>.
function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    moon.classList.toggle('fa-moon', !isDark);
    moon.classList.toggle('fa-sun', isDark);
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

let isDarkMode = document.documentElement.classList.contains('dark');

applyTheme(isDarkMode);

if (window.scrollY > 12) {
    header.classList.add('is-scrolled');
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
}, { passive: true });

themeToggle.addEventListener('click', ()=> {
    isDarkMode = !isDarkMode;
    try {
        localStorage.setItem(DARK_MODE_KEY, isDarkMode ? 'true' : 'false');
    } catch (e) {}
    applyTheme(isDarkMode);
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Auto-updating years. The HTML holds a fallback value for when JS doesn't run.
//   <span data-years-since="2016">10</span>  -> years since the given year
//   <span data-current-year>2026</span>      -> this year (copyright)

const thisYear = new Date().getFullYear();

document.querySelectorAll('[data-years-since]').forEach((el) => {
    el.textContent = thisYear - Number(el.dataset.yearsSince);
});

document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = thisYear;
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Gallery lightbox

const lightbox = document.getElementById('lightbox');

if (lightbox) {
    const lightboxImage = lightbox.querySelector('.lightboxImage');
    const lightboxClose = lightbox.querySelector('.lightboxClose');
    const galleryTriggers = document.querySelectorAll('button.galleryItem');

    function openLightbox(img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        lightboxImage.alt = '';
        document.body.style.overflow = '';
    }

    galleryTriggers.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) openLightbox(img);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
}
