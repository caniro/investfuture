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

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, message });

            // Show success message
            alert('감사합니다! 메시지가 성공적으로 전송되었습니다.');

            // Reset form
            contactForm.reset();
        });
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
