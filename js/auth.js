/**
 * =============================================================================================
 * AUTH SERVICE v1.0
 * Gestión segura de credenciales y lógica de presentación.
 * =============================================================================================
 */

class AuthController {
    constructor() {
        // Base de datos simulada (En producción, esto vendría de una API segura)
        this.authorizedUsers = [
            'danieliriarte0305@gmail.com',
            'matiasgastelu1@gmail.com',
            'ar86344@gmail.com',
            'ejuniorfloress@gmail.com'
        ];
        
        this.commonPassword = '123456789'; // Hash simulado

        // Referencias al DOM
        this.dom = {
            loginForm: document.getElementById('loginForm'),
            registerForm: document.getElementById('registerForm'),
            emailInput: document.getElementById('email'),
            passwordInput: document.getElementById('password'),
            toggleBtn: document.getElementById('togglePasswordBtn'),
            errorMsg: document.getElementById('loginError'),
            showRegisterBtn: document.getElementById('showRegisterBtn'),
            showLoginBtn: document.getElementById('showLoginBtn'),
            submitBtn: document.querySelector('#loginForm button[type="submit"]')
        };

        this.init();
    }

    init() {
        // 1. Manejo del Login
        if (this.dom.loginForm) {
            this.dom.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // 2. Visibilidad de Contraseña
        if (this.dom.toggleBtn) {
            this.dom.toggleBtn.addEventListener('click', () => this.togglePasswordVisibility());
        }

        // 3. Navegación (Switch Login/Register)
        this.dom.showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchView('register');
        });
        
        this.dom.showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchView('login');
        });

        // 4. Limpiar errores al escribir
        this.dom.emailInput.addEventListener('input', () => this.hideError());
        this.dom.passwordInput.addEventListener('input', () => this.hideError());
    }

    /**
     * Lógica de Autenticación
     */
    handleLogin(e) {
        e.preventDefault();
        this.hideError();
        this.setLoading(true);

        const email = this.dom.emailInput.value.trim();
        const password = this.dom.passwordInput.value.trim();

        // Simulación de Latencia de Red (UX Realista)
        setTimeout(() => {
            if (this.validateCredentials(email, password)) {
                // ÉXITO
                this.loginSuccess();
            } else {
                // ERROR
                this.showError('Correo o contraseña incorrectos.');
                this.setLoading(false);
            }
        }, 1000); // 1 segundo de espera artificial
    }

    /**
     * Validación contra "Base de Datos"
     */
    validateCredentials(email, password) {
        const isValidUser = this.authorizedUsers.includes(email);
        const isValidPass = password === this.commonPassword;
        return isValidUser && isValidPass;
    }

    /**
     * Acciones post-login
     */
    loginSuccess() {
        // Guardar sesión (simulado)
        localStorage.setItem('miletl_session', 'active');
        localStorage.setItem('miletl_user', this.dom.emailInput.value);

        // Feedback visual positivo
        const btnText = this.dom.submitBtn.querySelector('.btn-text');
        btnText.textContent = '¡Bienvenido!';
        this.dom.submitBtn.style.backgroundColor = '#27AE60'; // Verde éxito

        // Redirección al Dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html'; 
        }, 800);
    }

    /**
     * Utilidades de UI
     */
    togglePasswordVisibility() {
        const type = this.dom.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        this.dom.passwordInput.setAttribute('type', type);
        
        // Cambiar icono
        this.dom.toggleBtn.classList.toggle('fa-eye');
        this.dom.toggleBtn.classList.toggle('fa-eye-slash');
    }

    switchView(view) {
        this.hideError();
        if (view === 'register') {
            this.dom.loginForm.classList.add('hidden');
            this.dom.registerForm.classList.remove('hidden');
            this.dom.registerForm.classList.add('animate-entry');
        } else {
            this.dom.registerForm.classList.add('hidden');
            this.dom.loginForm.classList.remove('hidden');
            this.dom.loginForm.classList.add('animate-entry');
        }
    }

    showError(message) {
        this.dom.errorMsg.querySelector('span').textContent = message;
        this.dom.errorMsg.classList.remove('hidden');
        this.dom.passwordInput.value = ''; // Limpiar password por seguridad
        this.dom.passwordInput.focus();
    }

    hideError() {
        this.dom.errorMsg.classList.add('hidden');
    }

    setLoading(isLoading) {
        const loader = this.dom.submitBtn.querySelector('.loader');
        const text = this.dom.submitBtn.querySelector('.btn-text');
        
        if (isLoading) {
            text.style.opacity = '0';
            loader.classList.remove('hidden');
            this.dom.submitBtn.disabled = true;
        } else {
            text.style.opacity = '1';
            loader.classList.add('hidden');
            this.dom.submitBtn.disabled = false;
        }
    }
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    new AuthController();
    console.log('🔒 Auth Module Loaded - Secure Environment');
});