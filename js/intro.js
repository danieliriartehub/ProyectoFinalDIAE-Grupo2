/**
 * =============================================================================================
 * INTRO CONTROLLER v3.0 (Final)
 * Lógica: Narrativa interactiva. 
 * Estado 1: Dashboard claro + Zorro explicando.
 * Estado 2 (Clic): Oscurecimiento + Botón Login + Barra Roja.
 * =============================================================================================
 */

class IntroController {
    
    constructor() {
        this.dom = {
            body: document.getElementById('introBody'),
            dimmer: document.getElementById('dimmer'),
            mascotGroup: document.querySelector('.mascot-group'),
            bubbleTitle: document.getElementById('bubbleTitle'),
            bubbleText: document.getElementById('bubbleText'),
            loginContainer: document.getElementById('loginContainer'),
            progressBar: document.getElementById('introProgressBar'),
            btnLogin: document.getElementById('btnLogin')
        };

        this.state = {
            isFinished: false, // ¿Ya se mostró el login?
            progress: 0
        };

        this.init();
    }

    init() {
        // 1. Iniciar Animación de Barra (Verde -> Llenando)
        this.startProgressBar();

        // 2. Escuchar Clic en cualquier parte para finalizar
        this.dom.body.addEventListener('click', () => {
            if (!this.state.isFinished) {
                this.triggerFinishState();
            }
        });

        // 3. Redirección del Botón Login
        this.dom.btnLogin.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar doble trigger
            // Feedback
            this.dom.btnLogin.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 800);
        });
    }

    startProgressBar() {
        // Simular lectura: La barra avanza lento
        const duration = 5000; // 5 segundos para leer
        const interval = 50;
        let elapsed = 0;

        this.timer = setInterval(() => {
            if (this.state.isFinished) return; // Si ya terminó, parar lógica auto

            elapsed += interval;
            this.state.progress = Math.min((elapsed / duration) * 100, 100);
            this.dom.progressBar.style.width = `${this.state.progress}%`;

            // Si llega al final solo, activar estado final
            if (this.state.progress >= 100) {
                this.triggerFinishState();
            }
        }, interval);
    }

    triggerFinishState() {
        if (this.state.isFinished) return;
        this.state.isFinished = true;
        clearInterval(this.timer); // Detener timer automático

        // A. Llenar Barra y Cambiar a Rojo
        this.dom.progressBar.style.width = '100%';
        this.dom.progressBar.classList.add('red-fill');

        // B. Activar Dimmer (Oscurecer fondo)
        this.dom.dimmer.classList.add('active');

        // C. Mover Zorro a la Derecha y Cambiar Texto
        this.dom.mascotGroup.classList.add('move-right');
        
        // Cambiar texto del globo
        this.dom.bubbleTitle.innerText = "¿Te imaginas ver tus propios números aquí?";
        this.dom.bubbleText.innerHTML = "Este es solo un ejemplo. La verdadera magia sucede cuando analizamos <strong>tu información.</strong><br>Inicia sesión para descubrir lo que tu información te quiere decir hoy.";

        // D. Mostrar Botón Login
        this.dom.loginContainer.classList.remove('hidden');
        // Forzar reflow para animación
        void this.dom.loginContainer.offsetWidth;
        this.dom.loginContainer.classList.add('visible');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new IntroController();
});