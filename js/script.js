// ========== PREVENIR SCROLL NATIVO AL HASH (ANTES DE DOMCONTENTLOADED) ==========
if (window.location.hash && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
}

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

    // ========== ANIMACIONES CON SCROLL ==========
    const animateOnScroll = () => {
        // Contenidos de cajas
        const contentElements = document.querySelectorAll('.caja2-content, .caja3-content, .caja4-content, .caja5-content');
        
        // Indicadores
        const indicators = document.querySelectorAll('.caja2-indicator, .caja3-indicator, .caja4-indicator, .caja5-indicator');
        
        // Stats de experiencia
        const expStats = document.querySelectorAll('.exp-stat-card');
        
        // Experiencia header
        const expTitulo = document.querySelector('.experiencia-titulo-box');
        const expDestacado = document.querySelector('.experiencia-stat-destacado');
        const expDescripcion = document.querySelector('.experiencia-descripcion');
        
        // Footers de secciones
        const footers = document.querySelectorAll('.caja2-footer, .caja3-footer, .caja4-footer, .caja5-footer');
        
        // Servicios section
        const serviciosHeader = document.querySelector('.servicios-header');
        const serviciosTabs = document.querySelector('.servicios-tabs');
        const serviciosContent = document.querySelector('.servicios-content');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-inview');
                    
                    // Animar footer correspondiente
                    const section = entry.target.closest('[class*="caja"]');
                    if (section) {
                        const footer = section.querySelector('[class*="-footer"]');
                        if (footer) {
                            setTimeout(() => {
                                footer.style.opacity = '1';
                            }, 500);
                        }
                    }
                }
            });
        }, observerOptions);

        // Observar elementos
        contentElements.forEach(el => observer.observe(el));
        indicators.forEach(el => observer.observe(el));
        expStats.forEach(el => observer.observe(el));
        if (expTitulo) observer.observe(expTitulo);
        if (expDestacado) observer.observe(expDestacado);
        if (expDescripcion) observer.observe(expDescripcion);
        if (serviciosHeader) observer.observe(serviciosHeader);
        if (serviciosTabs) observer.observe(serviciosTabs);
        if (serviciosContent) observer.observe(serviciosContent);
    };

    // Ejecutar animaciones
    setTimeout(animateOnScroll, 500);
    
    // ========== ASEGURAR VISIBILIDAD DE FONDOS ==========
    // Garantizar que las imágenes de fondo de las cajas sean visibles
    setTimeout(() => {
        const sections = document.querySelectorAll('.caja2, .caja3, .caja4, .caja5');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'scale(1) translateY(0)';
        });
    }, 100);

    // ========== CONTADOR ANIMADO PARA ESTADÍSTICAS ==========
    function animateCounter(element, target, suffix = '', duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Animar números cuando aparezcan en viewport
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    entry.target.textContent = '0%';
                    animateCounter(entry.target, number, '%', 1500);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statObserver.observe(num));

    // Animar números grandes de experiencia
    const expStatNumbers = document.querySelectorAll('.stat-big-number, .exp-stat-number');
    const expObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                // Obtener solo el texto del número, sin los spans internos
                const fullText = entry.target.childNodes[0] ? entry.target.childNodes[0].textContent : entry.target.textContent;
                
                // Para números como "+3000"
                if (fullText.includes('+')) {
                    const numberStr = fullText.replace('+', '').trim();
                    const number = parseFloat(numberStr);
                    
                    if (!isNaN(number)) {
                        // Guardar la unidad si existe
                        const unitSpan = entry.target.querySelector('.exp-stat-unit');
                        const unit = unitSpan ? unitSpan.outerHTML : '';
                        
                        // Animar el contador
                        let current = 0;
                        const increment = number / (2000 / 16);
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                current = number;
                                clearInterval(timer);
                            }
                            
                            // Actualizar con formato correcto
                            if (unitSpan) {
                                entry.target.innerHTML = '+' + current.toFixed(1) + unit;
                            } else {
                                entry.target.textContent = '+' + Math.floor(current);
                            }
                        }, 16);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    expStatNumbers.forEach(num => expObserver.observe(num));

    // ========== EFECTO RIPPLE EN BOTONES ==========
    const buttons = document.querySelectorAll('.hero-btn, .nav-cta, .footer-submit-btn');
    
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

    // ========== ANIMACIÓN SMOOTH PARA TABS ==========
    const tabContentEls = document.querySelectorAll('.tab-content');
    
    tabContentEls.forEach(content => {
        content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // ========== ANIMACIÓN DE ENTRADA SUAVE PARA ELEMENTOS ==========
    // Prevenir FOUC (Flash of Unstyled Content)
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // ========== MEJORA DE RENDIMIENTO: LAZY LOADING ==========
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ========== ANIMACIÓN DE NÚMEROS CON FORMATO ==========
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // ========== EFECTO DE TYPING OPCIONAL PARA TÍTULOS ==========
    // Deshabilitado por defecto, pero disponible si se desea
    const enableTypingEffect = false;
    
    if (enableTypingEffect) {
        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.opacity = '1';
            
            let index = 0;
            const typeSpeed = 50;
            
            function typeText() {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeText, typeSpeed);
                }
            }
            
            setTimeout(typeText, 500);
        }
    }

    // ========== LOG DE ANIMACIONES ACTIVADAS ==========
    console.log('✨ Animaciones profesionales activadas');
    console.log('📊 Contadores animados listos');
    console.log('🎯 Efectos de scroll configurados');
    console.log('💫 Efectos de hover mejorados');

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

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    scroll.on('scroll', (args) => {
        const currentScrollY = args.scroll.y;
        
        // Show/hide scroll to top button
        if (currentScrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
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

    // ========== EFECTO PARALLAX SUAVE (SIN AFECTAR VISIBILIDAD) ==========
    scroll.on('scroll', (args) => {
        const currentScrollY = args.scroll.y;
        
        // Efecto parallax solo en el background position
        const sections = document.querySelectorAll('.caja2, .caja3, .caja4, .caja5');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top;
            
            // Efecto parallax sutil SOLO en el fondo
            const scrollPercent = (sectionTop / windowHeight) * 100;
            if (scrollPercent < 100 && scrollPercent > -100) {
                section.style.backgroundPosition = `center ${50 + scrollPercent * 0.15}%`;
            }
        });
        
        lastScrollY = currentScrollY;
    });

    // ========== TABS SERVICIOS ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Update Locomotive Scroll
            scroll.update();
        });
    });

    // ========== ANCHOR LINKS CON LOCOMOTIVE SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    scroll.scrollTo(target, {
                        duration: 1000,
                        easing: [0.25, 0.0, 0.35, 1.0],
                        offset: -100
                    });
                }
            }
        });
    });

    // ========== SCROLL AL HASH INICIAL (cuando vienes de otra página) ==========
    if (window.location.hash) {
        const hash = window.location.hash;
        
        // Esperar a que todo esté cargado
        window.addEventListener('load', () => {
            const target = document.querySelector(hash);
            if (target) {
                setTimeout(() => {
                    scroll.update();
                    scroll.scrollTo(target, {
                        duration: 1200,
                        easing: [0.25, 0.0, 0.35, 1.0],
                        offset: -100
                    });
                }, 500);
            }
        });
    }
});
