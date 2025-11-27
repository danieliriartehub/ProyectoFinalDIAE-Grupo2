/**
 * =============================================================================================
 * SETTINGS CONTROLLER v1.0
 * Lógica de Negocio: Gestión de Perfil, Mock DB update y Logout.
 * =============================================================================================
 */

class SettingsController {
    
    constructor() {
        // Base de datos extendida (Simulación)
        this.userDB = {
            'danieliriarte0305@gmail.com': { name: 'Daniel', surname: 'Iriarte', phone: '+51 999 111 222', role: 'System Architect' },
            'matiasgastelu1@gmail.com': { name: 'Matias', surname: 'Gastelu', phone: '+51 999 333 444', role: 'Product Owner' },
            'ar86344@gmail.com': { name: 'Alex', surname: 'R.', phone: '+51 999 555 666', role: 'Lead Developer' },
            'ejuniorfloress@gmail.com': { name: 'Edwin', surname: 'Flores', phone: '+51 999 777 888', role: 'SAP Consultant' }
        };

        this.dom = {
            sidebarAvatar: document.getElementById('sidebarAvatar'),
            sidebarName: document.getElementById('sidebarName'),
            sidebarEmail: document.getElementById('sidebarEmail'),
            inputName: document.getElementById('inputName'),
            inputSurname: document.getElementById('inputSurname'),
            inputEmail: document.getElementById('inputEmail'),
            inputPhone: document.getElementById('inputPhone'),
            personalForm: document.getElementById('personalForm'),
            logoutBtn: document.getElementById('logoutBtn')
        };

        this.init();
    }

    init() {
        this.verifySession();
        this.loadUserData();
        this.setupEventListeners();
    }

    /* 1. Verificar Sesión */
    verifySession() {
        const session = localStorage.getItem('miletl_session');
        if (!session) {
            // En producción:
            // window.location.href = 'login.html';
        }
    }

    /* 2. Cargar datos desde "Mock DB" usando el email de la sesión */
    loadUserData() {
        const email = localStorage.getItem('miletl_user') || 'danieliriarte0305@gmail.com'; // Fallback for demo
        const userData = this.userDB[email];

        if (userData) {
            // Llenar Sidebar
            this.dom.sidebarName.textContent = `${userData.name} ${userData.surname}`;
            this.dom.sidebarEmail.textContent = email;
            this.dom.sidebarAvatar.textContent = userData.name.substring(0, 2).toUpperCase();

            // Llenar Formulario
            this.dom.inputName.value = userData.name;
            this.dom.inputSurname.value = userData.surname;
            this.dom.inputEmail.value = email;
            this.dom.inputPhone.value = userData.phone;
        }
    }

    /* 3. Event Listeners */
    setupEventListeners() {
        // Simular Guardado de Datos
        this.dom.personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveData();
        });

        // Logout Real
        this.dom.logoutBtn.addEventListener('click', () => {
            this.handleLogout();
        });
    }

    saveData() {
        const btn = this.dom.personalForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        // Efecto de carga
        btn.textContent = 'Guardando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            alert('✅ Cambios guardados correctamente en el sistema.');
        }, 1000);
    }

    handleLogout() {
        if(confirm('¿Estás seguro que deseas cerrar sesión?')) {
            // Limpiar sesión local
            localStorage.removeItem('miletl_session');
            localStorage.removeItem('miletl_user');
            
            // Redirigir al login
            window.location.href = 'login.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SettingsController();
});