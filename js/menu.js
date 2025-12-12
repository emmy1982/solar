// ========== MENÚ MÓVIL RESPONSIVE PROFESIONAL ==========
// Sistema de menú móvil completamente separado del menú desktop

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');
    const body = document.body;

    // Verificar que los elementos existen
    if (!mobileMenuToggle || !mobileMenuOverlay) {
        console.warn('Elementos del menú móvil no encontrados');
        return;
    }

    // Función para abrir el menú móvil
    const openMobileMenu = () => {
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuOverlay.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
        
        // Focus trap - enfocar el botón de cerrar
        if (mobileMenuClose) {
            setTimeout(() => mobileMenuClose.focus(), 100);
        }
    };

    // Función para cerrar el menú móvil
    const closeMobileMenu = () => {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuOverlay.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
        
        // Devolver el foco al botón toggle
        setTimeout(() => mobileMenuToggle.focus(), 100);
    };

    // Toggle del menú al hacer clic en el botón hamburguesa
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Cerrar menú al hacer clic en el botón X
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Cerrar menú al hacer clic en un enlace
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Cerrar menú al hacer clic en el overlay (fuera del contenido)
    mobileMenuOverlay.addEventListener('click', (e) => {
        // Solo cerrar si se hace clic directamente en el overlay, no en su contenido
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Cerrar menú al cambiar el tamaño de ventana a escritorio
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 900 && mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 100);
    });

    // Prevenir scroll en iOS cuando el menú está abierto
    mobileMenuOverlay.addEventListener('touchmove', (e) => {
        // Permitir scroll dentro del contenido del menú
        if (!e.target.closest('.mobile-menu-content')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Trap focus dentro del menú cuando está abierto
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    mobileMenuOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && mobileMenuOverlay.classList.contains('active')) {
            const focusableContent = mobileMenuOverlay.querySelectorAll(focusableElements);
            const firstFocusable = focusableContent[0];
            const lastFocusable = focusableContent[focusableContent.length - 1];

            if (e.shiftKey) {
                // Si presiona Shift + Tab en el primer elemento, ir al último
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                // Si presiona Tab en el último elemento, ir al primero
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });

    // Inicializar atributos de accesibilidad
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    mobileMenuOverlay.setAttribute('role', 'dialog');
    mobileMenuOverlay.setAttribute('aria-modal', 'true');

    console.log('✅ Menú móvil responsive inicializado correctamente');
});
