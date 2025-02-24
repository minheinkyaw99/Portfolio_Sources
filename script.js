document.addEventListener("DOMContentLoaded", function () {
    // ======= Theme Toggle =========
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('i');
    const root = document.documentElement;

    // Set initial theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    root.setAttribute('data-theme', defaultTheme);
    updateTheme(defaultTheme);

    function setTheme(theme) {
        if (root.getAttribute('data-theme') === theme) return;
        root.setAttribute('data-theme', theme);
        updateTheme(theme);
        localStorage.setItem('theme', theme);
    }

    function updateTheme(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        updateNavForTheme(theme);
    }

    function updateNavForTheme(theme) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.color = theme === 'dark' ? '#ffffff' : '';
        });
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // ======= Smooth Fade-in Animations =========
    const fadeElements = document.querySelectorAll(".fade-in, .timeline-item, .slide-in-left, .slide-in-right");
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                fadeObserver.unobserve(entry.target); // Improve performance by unobserving once visible
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ======= Timeline Hover Effect =========
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.classList.add('hovered'));
        item.addEventListener('mouseleave', () => item.classList.remove('hovered'));
    });

    // ======= Smooth Scrolling for Navigation Links =========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ======= Contact Form Submission (Mock) =========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! Your message has been sent successfully.');
            contactForm.reset();
        });
    }

    // ======= Active Navigation Link Highlight on Scroll =========
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav);

    // ======= Fix for Navigation Highlight Not Working Initially =========
    highlightActiveNav();
});
