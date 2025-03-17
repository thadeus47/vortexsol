document.addEventListener('DOMContentLoaded', () => {
    // Initialize WOW.js
    new WOW().init();

    // Mobile Menu Toggle
    const navToggler = document.querySelector('.nav-toggler');
    const navMenu = document.querySelector('.site-nav-menu');
    const navClose = document.querySelector('.nav-close');

    // Add safeguards for null elements
    if (navToggler && navMenu && navClose) {
        navToggler.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });

        // Close menu when clicking a submenu item or scroll link
        document.querySelectorAll('.submenu li a, .scroll-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Toggle submenu on mobile
        document.querySelectorAll('.dd-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const submenu = trigger.parentElement.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    } else {
        console.error('One or more menu elements not found:', { navToggler, navMenu, navClose });
    }

    // Smooth Scrolling for Scroll Links
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            // If on index.html, scroll directly
            if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for sticky header height
                        behavior: 'smooth'
                    });
                }
            } else {
                // If on another page, redirect to index.html with hash
                window.location.href = `index.html${href}`;
            }
        });
    });

    // Handle Hash on Page Load (e.g., coming from another page to index.html#products or #services)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for sticky header height
                    behavior: 'smooth'
                });
            }, 100); // Small delay to ensure page load
        }
    }

    // Initialize Hero Slider
    if (typeof $('.banner-slider').slick === 'function') {
        $('.banner-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<span class="prev slick-arrow"><i class="fas fa-angle-left"></i></span>',
            nextArrow: '<span class="next slick-arrow"><i class="fas fa-angle-right"></i></span>',
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
    } else {
        console.warn('Hero Slider not initialized. Ensure jQuery and Slick are loaded.');
    }

    
});