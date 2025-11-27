/**
 * =============================================================================================
 * APP CONTROLLER v2.0
 * Arquitectura: Class-Based (POO)
 * Características: Sidebar Manager, IntersectionObserver, ScrollSpy.
 * =============================================================================================
 */

class AppController {
    
    constructor() {
        // 1. Cacheo de Referencias DOM (Mejora performance al no buscar elementos repetidamente)
        this.dom = {
            header: document.querySelector('header'),
            menuTrigger: document.getElementById('mobileMenuTrigger'),
            closeBtn: document.getElementById('closeSidebarBtn'),
            navContainer: document.getElementById('navContainer'), // El Sidebar
            overlay: document.getElementById('sidebarOverlay'),
            navLinks: document.querySelectorAll('.nav-link'),
            sections: document.querySelectorAll('section'),
            scrollTriggers: document.querySelectorAll('a[href^="#"]'), // Todos los links ancla
            animatedElements: document.querySelectorAll('.hidden-element')
        };

        // 2. Estado de la Aplicación
        this.state = {
            isSidebarOpen: false
        };

        // 3. Iniciar módulos
        this.initEventListeners();
        this.initObserver(); // Animaciones al scroll
    }

    /**
     * =================================================================================
     * TEORÍA: CONTEXTO 'THIS' Y ARROW FUNCTIONS (LAMBDAS)
     * =================================================================================
     * En JavaScript clásico, 'function() {}' crea su propio contexto 'this'. 
     * Si usáramos 'function(e)' aquí abajo, 'this.toggleSidebar' fallaría porque 'this' 
     * apuntaría al botón HTML clickeado, no a nuestra clase AppController.
     * * Al usar Arrow Functions '() =>', heredamos el 'this' léxico de la clase.
     * Así 'this.toggleSidebar' sigue refiriéndose a nuestro método.
     * =================================================================================
     */
    initEventListeners() {
        // Toggle Sidebar
        if(this.dom.menuTrigger) {
            this.dom.menuTrigger.addEventListener('click', () => this.toggleSidebar(true));
        }
        if(this.dom.closeBtn) {
            this.dom.closeBtn.addEventListener('click', () => this.toggleSidebar(false));
        }
        if(this.dom.overlay) {
            this.dom.overlay.addEventListener('click', () => this.toggleSidebar(false));
        }

        // Navegación Suave (Smooth Scroll) + Cerrar Sidebar al clickear link
        this.dom.scrollTriggers.forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothNavigation(e));
        });

        // Sticky Header & ScrollSpy
        // Usamos 'bind(this)' como alternativa a arrow functions para asegurar contexto
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    /**
     * LÓGICA DEL SIDEBAR (DRAWER)
     * @param {boolean} open - Estado deseado (true = abrir, false = cerrar)
     */
    toggleSidebar(open) {
        this.state.isSidebarOpen = open;
        
        // Manipulación de Clases CSS para transiciones limpias
        if (open) {
            this.dom.navContainer.classList.add('sidebar-open');
            this.dom.overlay.classList.add('active');
            // Bloqueamos el scroll del body para evitar "doble scroll"
            document.body.style.overflow = 'hidden'; 
        } else {
            this.dom.navContainer.classList.remove('sidebar-open');
            this.dom.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * MANEJO DE NAVEGACIÓN
     * Calcula la posición exacta restando la altura del header sticky.
     */
    handleSmoothNavigation(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if(targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            // Si el sidebar está abierto, cerrarlo primero
            if(this.state.isSidebarOpen) this.toggleSidebar(false);

            // Cálculo preciso del offset (altura del header aprox 80px)
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    /**
     * SCROLL SPY & STICKY HEADER
     * Se ejecuta al hacer scroll.
     */
    handleScroll() {
        const scrollY = window.scrollY;

        // 1. Efecto Sticky Header
        if (scrollY > 50) {
            this.dom.header.classList.add('scrolled');
        } else {
            this.dom.header.classList.remove('scrolled');
        }

        // 2. Scroll Spy (Detectar sección activa)
        let currentSectionId = '';
        
        this.dom.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Margen de tolerancia
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });

        // Actualizar clase 'active' en el menú
        this.dom.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    /**
     * INTERSECTION OBSERVER
     * Reemplazo moderno y performante para detectar elementos en pantalla.
     * Dispara animaciones solo cuando el usuario llega a la sección.
     */
    initObserver() {
        const observerOptions = {
            threshold: 0.15, // Detonar cuando el 15% del elemento es visible
            rootMargin: "0px 0px -50px 0px" 
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-element');
                    obs.unobserve(entry.target); // Dejar de observar para ahorrar recursos
                }
            });
        }, observerOptions);

        this.dom.animatedElements.forEach(el => observer.observe(el));
    }
}

// Inicialización Segura (Entry Point)
document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    console.log('🚀 System Initialized: MILETL Architecture v2.0 Ready');
});