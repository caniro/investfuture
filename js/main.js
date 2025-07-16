// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fixed header behavior
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');

    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Language switching functionality
    const langKoButton = document.getElementById('lang-ko');
    const langEnButton = document.getElementById('lang-en');

    // Function to set language
    function setLanguage(lang) {
        // Update html lang attribute
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-language', lang);

        // Update all elements with data-lang-* attributes
        document.querySelectorAll('[data-lang-ko], [data-lang-en]').forEach(element => {
            const langAttr = `data-lang-${lang}`;
            if (element.hasAttribute(langAttr)) {
                const translation = element.getAttribute(langAttr);
                // For inputs, set value; for others, set innerHTML
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });

        // Update active class on language buttons
        langKoButton.classList.toggle('active', lang === 'ko');
        langEnButton.classList.toggle('active', lang === 'en');

        // Store language preference in localStorage
        localStorage.setItem('language', lang);
    }

    // Add event listeners to language buttons
    if (langKoButton && langEnButton) {
        langKoButton.addEventListener('click', function() {
            setLanguage('ko');
        });

        langEnButton.addEventListener('click', function() {
            setLanguage('en');
        });

        // Check for stored language preference
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }

    // Mobile menu toggle (for responsive design)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');

    if (mobileMenuButton && nav && overlay) {
        // Toggle menu when button is clicked
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when overlay is clicked
        overlay.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });

        // Close menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
});
