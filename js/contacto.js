document.addEventListener('DOMContentLoaded', () => {
    // ========== SCROLL TO TOP BUTTON ==========
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    // ========== SCROLL TO TOP BUTTON ==========
    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on button click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== FORM VALIDATION Y ANIMACIÓN ==========
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Animación de focus en inputs
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.01)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // Submit form
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.nombre || !data.email || !data.mensaje) {
                // Shake animation for invalid form
                contactForm.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinner">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="30 60"/>
                </svg>
                Enviando...
            `;
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ¡Mensaje enviado!
                `;
                submitBtn.style.background = '#4CAF50';
                
                // Confetti effect
                createConfetti();
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // ========== ANIMACIÓN DE SCROLL AVANZADA ==========
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Animar contact cards con delay escalonado
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animar CTA cards con delay escalonado
    const ctaCards = document.querySelectorAll('.cta-card');
    ctaCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Animar form wrapper
    const formWrapper = document.querySelector('.contact-form-wrapper');
    if (formWrapper) {
        observer.observe(formWrapper);
    }

    // Animar proceso section
    const processContent = document.querySelector('.process-content');
    if (processContent) {
        processContent.style.opacity = '0';
        processContent.style.transform = 'translateY(40px)';
        processContent.style.transition = 'all 0.8s ease';
        observer.observe(processContent);
        
        processContent.classList.add('animate-in');
    }

    // ========== SMOOTH SCROLL PARA ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========== ANIMACIONES SIMPLES DE SCROLL ==========
    // Animar sección de información al hacer scroll
    const contactInfo = document.querySelector('.contact-info-side');
    const contactFormSide = document.querySelector('.contact-form-side');
    
    if (contactInfo) {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateX(-30px)';
        contactInfo.style.transition = 'all 0.8s ease';
        observer.observe(contactInfo);
        
        contactInfo.addEventListener('transitionend', function handler() {
            contactInfo.classList.add('animate-in');
            contactInfo.removeEventListener('transitionend', handler);
        });
    }
    
    if (contactFormSide) {
        contactFormSide.style.opacity = '0';
        contactFormSide.style.transform = 'translateX(30px)';
        contactFormSide.style.transition = 'all 0.8s ease 0.2s';
        observer.observe(contactFormSide);
        
        contactFormSide.addEventListener('transitionend', function handler() {
            contactFormSide.classList.add('animate-in');
            contactFormSide.removeEventListener('transitionend', handler);
        });
    }

    // ========== CONFETTI EFFECT ==========
    function createConfetti() {
        const colors = ['#c8e84b', '#e1f887', '#b5d43a', '#9dc02f'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.pointerEvents = 'none';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '99999';
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            let posX = parseFloat(confetti.style.left);
            let posY = -10;
            let velocityX = Math.cos(angle) * velocity;
            let velocityY = Math.sin(angle) * velocity + 2;
            let rotation = 0;
            let rotationSpeed = (Math.random() - 0.5) * 10;
            
            const animate = () => {
                posY += velocityY;
                posX += velocityX;
                rotation += rotationSpeed;
                velocityY += 0.3; // Gravity
                
                confetti.style.top = posY + 'px';
                confetti.style.left = posX + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.opacity = Math.max(0, 1 - (posY / window.innerHeight));
                
                if (posY < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            animate();
        }
    }

    // ========== EFECTOS DE HOVER EN INPUTS ==========
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('mouseleave', function() {
            if (document.activeElement !== this) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // ========== EFECTO RIPPLE EN BOTONES ==========
    const buttons = document.querySelectorAll('.contact-submit-btn, .cta-btn');
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

    // Agregar estilos CSS dinámicos
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .contact-form .form-group {
            transition: transform 0.3s ease;
        }
        
        .contact-form input,
        .contact-form select,
        .contact-form textarea {
            transition: transform 0.2s ease, border-color 0.3s ease, background 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // ========== LOG ==========
    console.log('✨ Animaciones de contacto activadas');
    console.log('📧 Formulario interactivo listo');
    console.log('🎯 Efectos de scroll configurados');
});
