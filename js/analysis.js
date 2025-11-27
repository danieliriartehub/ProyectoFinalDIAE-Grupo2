/**
 * =============================================================================================
 * ANALYSIS CONTROLLER
 * Lógica: Gestión de estado de tarjetas, efecto focus y navegación condicional.
 * =============================================================================================
 */

class AnalysisController {
    
    constructor() {
        this.dom = {
            cards: {
                volume: document.getElementById('cardVolume'),
                fixes: document.getElementById('cardFixes'),
                quality: document.getElementById('cardQuality')
            },
            btnNext: document.getElementById('btnNextStep')
        };

        // Estado: Qué tarjetas ya fueron revisadas
        this.state = {
            viewed: {
                volume: false,
                fixes: false,
                quality: false
            }
        };

        this.init();
    }

    init() {
        // Exponer funciones al objeto global window para que el HTML pueda llamarlas
        // (Alternativa a addEventListener para mantener el HTML limpio con onclicks directos)
        window.showDetail = (cardId) => this.activateCard(cardId);
        window.closeDetail = () => this.deactivateAll();
        
        // Listener para el botón Next
        this.dom.btnNext.addEventListener('click', () => {
            // Animación de salida antes de irse
            document.querySelector('.analysis-main').style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'insights.html'; // Siguiente paso lógico
            }, 500);
        });
    }

    activateCard(cardKey) {
        // 1. Resetear otros
        this.deactivateAll();

        // 2. Activar Tarjeta Específica
        const card = this.dom.cards[cardKey];
        if (card) {
            card.classList.add('active');
            
            // 3. Marcar como visto
            this.state.viewed[cardKey] = true;
            this.checkCompletion();
        }
    }

    deactivateAll() {
        Object.values(this.dom.cards).forEach(card => {
            card.classList.remove('active');
        });
    }

    checkCompletion() {
        // Verificar si las 3 flags son true
        const allViewed = Object.values(this.state.viewed).every(v => v === true);
        
        if (allViewed) {
            this.dom.btnNext.classList.remove('disabled');
            // Efecto visual para llamar la atención a la flecha
            this.dom.btnNext.style.animation = 'pulse 1.5s infinite';
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new AnalysisController();
});