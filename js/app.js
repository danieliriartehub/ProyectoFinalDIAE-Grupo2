/**
 * =============================================================================================
 * APP CONTROLLER v3.0 (Restaurado)
 * Lógica: Manejo de Sidebar Móvil y Scroll Suave.
 * =============================================================================================
 */

class AppController {
    
    constructor() {
        this.dom = {
            menuTrigger: document.getElementById('mobileMenuTrigger'),
            closeBtn: document.getElementById('closeSidebarBtn'),
            navContainer: document.getElementById('navContainer'),
            overlay: document.getElementById('sidebarOverlay'),
            scrollLinks: document.querySelectorAll('a[href^="#"]')
        };

        this.init();
    }

    init() {
        this.setupSidebar();
        this.setupSmoothScroll();
    }

    setupSidebar() {
        if (this.dom.menuTrigger) {
            this.dom.menuTrigger.addEventListener('click', () => this.toggleSidebar(true));
        }
        if (this.dom.closeBtn) {
            this.dom.closeBtn.addEventListener('click', () => this.toggleSidebar(false));
        }
        if (this.dom.overlay) {
            this.dom.overlay.addEventListener('click', () => this.toggleSidebar(false));
        }
    }

    toggleSidebar(isOpen) {
        if (isOpen) {
            this.dom.navContainer.classList.add('active');
            this.dom.overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll
        } else {
            this.dom.navContainer.classList.remove('active');
            this.dom.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    setupSmoothScroll() {
        this.dom.scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Solo si es un link interno
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Cerrar sidebar si está abierto (móvil)
                        this.toggleSidebar(false);
                        
                        // Scroll
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new AppController();
    console.log('🚀 Landing Page Loaded & Restored');
});