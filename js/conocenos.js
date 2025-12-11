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
        // Mission boxes
        const missionBoxes = document.querySelectorAll('.mission-box');
        
        // Value items
        const valueItems = document.querySelectorAll('.value-item');
        
        // Team stats
        const teamStats = document.querySelectorAll('.team-stat');
        
        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Final CTA
        const finalCTA = document.querySelector('.final-cta-container');
        
        // Imágenes (Mission y Team)
        const missionImage = document.querySelector('.mission-box-image img');
        const teamImage = document.querySelector('.team-box-image img');
        
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
        missionBoxes.forEach(el => observer.observe(el));
        valueItems.forEach(el => observer.observe(el));
        teamStats.forEach(el => observer.observe(el));
        timelineItems.forEach(el => observer.observe(el));
        if (finalCTA) observer.observe(finalCTA);
        if (missionImage) observer.observe(missionImage);
        if (teamImage) observer.observe(teamImage);
    };

    // Ejecutar animaciones
    setTimeout(animateOnScroll, 500);

    // ========== CONTADOR ANIMADO PARA ESTADÍSTICAS DEL EQUIPO ==========
    function animateCounter(element, target, suffix = '', duration = 2000) {
        let current = 0;
        const targetNum = parseInt(target.replace('+', ''));
        const hasPlus = target.includes('+');
        const increment = targetNum / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            element.textContent = (hasPlus ? '+' : '') + Math.floor(current) + suffix;
        }, 16);
    }

    // Animar números del equipo
    const teamStatNumbers = document.querySelectorAll('.team-stat-number');
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text.replace('+', ''));
                
                if (!isNaN(number)) {
                    entry.target.textContent = hasPlus ? '+0' : '0';
                    animateCounter(entry.target, text, '', 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    teamStatNumbers.forEach(num => teamObserver.observe(num));

    // ========== EFECTO RIPPLE EN BOTONES ==========
    const buttons = document.querySelectorAll('.hero-btn, .nav-cta, .footer-submit-btn, .btn-secondary');
    
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

    // ========== LOG DE ANIMACIONES ACTIVADAS ==========
    console.log('✨ Animaciones de Conócenos activadas');
    console.log('📊 Contadores animados listos');
    console.log('🎯 Efectos de scroll configurados');

    // ========== FORM SUBMIT ==========
    const footerForm = document.querySelector('.footer-form');
    
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = footerForm.querySelector('.footer-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '¡Mensaje enviado!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    footerForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
