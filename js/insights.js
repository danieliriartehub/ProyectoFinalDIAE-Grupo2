/**
 * =============================================================================================
 * INSIGHTS CONTROLLER v3.0
 * Lógica: Grid interactivo con "Bubbles" explicativas y progreso forzado.
 * =============================================================================================
 */

class InsightsController {
    
    constructor() {
        this.dom = {
            overlay: document.getElementById('focusOverlay'),
            cards: {
                cardMain: document.getElementById('cardMain'),
                cardRegion: document.getElementById('cardRegion'),
                cardTop: document.getElementById('cardTop'),
                cardWeekly: document.getElementById('cardWeekly')
            },
            btnNext: document.getElementById('btnNext'),
            progressBar: document.getElementById('progressBar')
        };

        this.state = {
            read: {
                cardMain: false,
                cardRegion: false,
                cardTop: false,
                cardWeekly: false
            }
        };

        this.init();
    }

    init() {
        window.toggleInsight = (cardId) => this.activateCard(cardId);

        // Cerrar al hacer clic en overlay
        this.dom.overlay.addEventListener('click', () => this.deactivateAll());

        // Botones "Entendido"
        document.querySelectorAll('.btn-ok').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deactivateAll();
            });
        });

        // Botón Siguiente
        this.dom.btnNext.addEventListener('click', () => {
            if (this.dom.btnNext.classList.contains('active')) {
                window.location.href = 'intro.html';
            } else {
                // Feedback visual si intentan avanzar antes de tiempo
                this.dom.btnNext.style.transform = "translateX(-5px)";
                setTimeout(() => this.dom.btnNext.style.transform = "translateX(0)", 100);
            }
        });
    }

    activateCard(cardId) {
        if (this.dom.cards[cardId].classList.contains('active')) return;

        this.deactivateAll();

        this.dom.overlay.classList.add('active');
        this.dom.cards[cardId].classList.add('active');

        // Marcar como leído
        if (!this.state.read[cardId]) {
            this.state.read[cardId] = true;
            this.updateProgress();
        }
    }

    deactivateAll() {
        this.dom.overlay.classList.remove('active');
        Object.values(this.dom.cards).forEach(card => {
            card.classList.remove('active');
        });
    }

    updateProgress() {
        const total = 4; // Ahora son 4 gráficos
        const readCount = Object.values(this.state.read).filter(v => v).length;
        
        // Simular progreso de 66% a 90%
        const baseProgress = 66;
        const stepValue = (24 / total); // 24% para llenar hasta 90%
        const currentWidth = baseProgress + (readCount * stepValue);

        this.dom.progressBar.style.width = `${currentWidth}%`;

        if (readCount === total) {
            this.dom.btnNext.classList.remove('disabled');
            this.dom.btnNext.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InsightsController();
});