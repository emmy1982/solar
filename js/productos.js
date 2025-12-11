document.addEventListener('DOMContentLoaded', () => {
    // Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.1,
        getDirection: true,
        getSpeed: true,
        class: 'is-revealed'
    });

    scroll.update();

    // ========== NAVBAR MOBILE MENU ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    let lastScrollY = 0;
    const navbar = document.querySelector('.navbar');

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    scroll.on('scroll', (args) => {
        const currentScrollY = args.scroll.y;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide scroll to top button
        if (currentScrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        lastScrollY = currentScrollY;
    });

    // Scroll to top on button click
    scrollTopBtn.addEventListener('click', () => {
        scroll.scrollTo('top', {
            duration: 1000,
            easing: [0.25, 0.0, 0.35, 1.0]
        });
    });

    // Recargar en cambios de tamaño
    window.addEventListener('resize', () => {
        scroll.update();
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 900) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========== ANIMACIONES CON SCROLL ==========
    const animateOnScroll = () => {
        // Category headers
        const categoryHeaders = document.querySelectorAll('.category-header');
        
        // Product cards
        const productCards = document.querySelectorAll('.product-card');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-inview');
                }
            });
        }, observerOptions);

        // Observar elementos
        categoryHeaders.forEach(el => observer.observe(el));
        
        // Observar cards con delay progresivo
        productCards.forEach((card, index) => {
            observer.observe(card);
            // Agregar delay escalonado
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    };

    // Ejecutar animaciones
    setTimeout(animateOnScroll, 500);

    // ========== EFECTO RIPPLE EN BOTONES ==========
    const buttons = document.querySelectorAll('.product-btn, .nav-cta, .footer-submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ========== ANIMACIÓN DE IMÁGENES DE PRODUCTOS ==========
    const productImages = document.querySelectorAll('.product-image img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.3 });

    productImages.forEach(img => {
        img.style.transform = 'scale(1.1)';
        img.style.opacity = '0.8';
        img.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        imageObserver.observe(img);
    });

    // ========== LOG DE ANIMACIONES ACTIVADAS ==========
    console.log('✨ Animaciones de Productos activadas');
    console.log('🛍️ Product cards animadas');
    console.log('🎯 Efectos de scroll configurados');
});

