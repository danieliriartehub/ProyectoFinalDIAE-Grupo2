/**
 * =============================================================================================
 * APP CONTROLLER v3.1 (Hotfix)
 * Lógica: Manejo de Menú Móvil y Scroll Suave.
 * Adaptado a la estructura HTML original de index.html para no romper el layout.
 * =============================================================================================
 */

class AppController {
    
    constructor() {
        this.dom = {
            // Selectors updated to match index.html
            menuTrigger: document.getElementById('mobileMenuBtn'), 
            navLinks: document.getElementById('navLinks'),
            scrollLinks: document.querySelectorAll('a[href^="#"]')
        };

        this.init();
    }

    init() {
        this.setupMobileMenu(); // Renamed for clarity
        this.setupSmoothScroll();
    }

    // Simplified mobile menu toggle
    setupMobileMenu() {
        if (this.dom.menuTrigger && this.dom.navLinks) {
            this.dom.menuTrigger.addEventListener('click', () => {
                this.dom.navLinks.classList.toggle('nav-active');
            });
        }
    }

    setupSmoothScroll() {
        this.dom.scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Only process internal hash links
                if (href.startsWith('#')) {
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        e.preventDefault();
                        
                        // If mobile menu is open, close it
                        if (this.dom.navLinks && this.dom.navLinks.classList.contains('nav-active')) {
                            this.dom.navLinks.classList.remove('nav-active');
                        }
                        
                        // Scroll smoothly
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    // If targetElement doesn't exist, the link will do nothing, which is correct.
                }
            });
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new AppController();
    console.log('🚀 Landing Page Loaded & Hotfix Applied');
});