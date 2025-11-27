/**
 * =============================================================================================
 * DASHBOARD CONTROLLER v1.0
 * Lógica de Negocio: Personalización de Vista según Rol/Usuario.
 * =============================================================================================
 */

class DashboardManager {
    constructor() {
        // Base de datos Mock (Mapeo Email -> Nombre)
        this.userDB = {
            'danieliriarte0305@gmail.com': 'Daniel',
            'matiasgastelu1@gmail.com': 'Matias',
            'ar86344@gmail.com': 'Alex',
            'ejuniorfloress@gmail.com': 'Edwin'
        };

        // Referencias al DOM
        this.dom = {
            userName: document.getElementById('dynamicUserName'),
            userInitials: document.getElementById('userInitials'),
            dateDisplay: document.getElementById('currentDate'),
            profileBtn: document.getElementById('profileTrigger')
        };

        this.init();
    }

    init() {
        this.verifySession();
        this.renderUserProfile();
        this.renderDate();
        this.setupNavigation();
    }

    /* 1. Seguridad básica: Si no hay sesión, vuelve al login */
    verifySession() {
        const session = localStorage.getItem('miletl_session');
        if (!session) {
            // Descomentar para producción:
            // window.location.href = 'login.html';
            console.warn('Sesión no detectada (Modo Desarrollo)');
        }
    }

    /* 2. Lógica de Personalización (Tu requerimiento principal) */
    renderUserProfile() {
        const email = localStorage.getItem('miletl_user') || 'guest';
        
        // Buscamos el nombre en nuestra "BD". Si no existe, usamos "Usuario"
        const name = this.userDB[email] || 'Usuario';
        
        // Actualizar HTML
        this.dom.userName.textContent = name;
        
        // Generar iniciales (Ej: Daniel -> DA, Matias -> MA)
        // Si el nombre es corto, tomamos las 2 primeras letras
        const initials = name.substring(0, 2).toUpperCase();
        this.dom.userInitials.textContent = initials;
    }

    /* 3. Utilidad de Fecha (Formato local amigable) */
    renderDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        // Truco para capitalizar la primera letra (viernes -> Viernes)
        const dateStr = now.toLocaleDateString('es-ES', options);
        const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
        
        this.dom.dateDisplay.innerHTML = `<i class="far fa-calendar-alt"></i> ${capitalizedDate}`;
    }

    /* 4. Preparamos el listener para la siguiente vista */
    setupNavigation() {
        if (this.dom.profileBtn) {
            this.dom.profileBtn.addEventListener('click', () => {
                window.location.href = 'settings.html';
            });
        }
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});