const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('home');

/* --- Sticky Navbar Visibility --- */
window.addEventListener('scroll', () => {
    if (window.scrollY > heroSection.offsetHeight - 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

/* --- Smooth Scrolling for Anchor Links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* --- Scroll Reveal with Stagger --- */
const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger items inside the same grid / list
            const parent = entry.target.parentElement;
            const siblings = parent
                ? [...parent.querySelectorAll(
                    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
                  )]
                : [];
            const idx = siblings.indexOf(entry.target);

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 120);

            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* --- Hero Reveal on Load --- */
window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal-left, .hero .reveal-right, .hero .reveal-scale')
        .forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 200);
        });
});