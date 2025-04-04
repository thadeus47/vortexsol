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

    const slider = document.querySelector('.brand-slider-row');
    const sliderWidth = slider.offsetWidth;
    const singleBrandWidth = slider.querySelector('.single-brand').offsetWidth;

    function resetSlider() {
        if (slider) {
            const currentPosition = parseFloat(getComputedStyle(slider).transform.split(',')[4]) || 0;
            if (currentPosition <= -sliderWidth / 2) {
                slider.style.transition = 'none'; // Disable transition for instant reset
                slider.style.transform = `translateX(0)`; // Reset to start
                // Force reflow
                slider.offsetHeight;
                slider.style.transition = 'transform 0s linear'; // Re-enable transition
                setTimeout(() => {
                    slider.style.transition = 'transform 20s linear'; // Restore original animation
                }, 0);
            }
        }
    }

    // Check position every frame
    function animate() {
        requestAnimationFrame(animate);
        resetSlider();
    }

    animate();

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });

    slider.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });

    // Scroll to Apply Now Section
    const applyButtons = document.querySelectorAll('.apply-btn');
    const applySection = document.querySelector('.apply-section');

    applyButtons.forEach(button => {
        button.addEventListener('click', function () {
            applySection.scrollIntoView({ behavior: 'smooth' });
            // Prefill the position dropdown
            const position = this.closest('.job-card').querySelector('h4').textContent.toLowerCase().replace(/ /g, '-');
            document.getElementById('position').value = position;
        });
    });

    // File Size Validation
    const cvInput = document.getElementById('cv');
    const form = document.querySelector('.apply-section form');

    form.addEventListener('submit', function (event) {
        if (cvInput.files.length > 0) {
            const fileSize = cvInput.files[0].size / 1024 / 1024; // Convert to MB
            if (fileSize > 5) {
                event.preventDefault();
                alert('File size exceeds 5MB limit. Please upload a smaller file.');
            }
        }
    });

    // Parallax effect for the Key Features section
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.feature-parallax-section .parallax-bg');
        if (parallax) {
            const scrollPosition = window.pageYOffset;
            const sectionTop = parallax.parentElement.offsetTop;
            const sectionHeight = parallax.parentElement.offsetHeight;
            const windowHeight = window.innerHeight;

            // Check if the section is in view
            if (scrollPosition + windowHeight > sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const offset = (scrollPosition - sectionTop) * 0.3; // Adjust speed (0.3 for subtle effect)
                parallax.style.transform = `translateY(${offset}px)`;
            }
        }
    });
    
});
