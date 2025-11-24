/*
  =============================================================================================
  ARCHIVO: app.js
  DESCRIPCIÓN: Lógica del lado del cliente para la interactividad de la UI.
  
  FUNCIONALIDADES:
  1. Menú responsivo (Toggle para móviles).
  2. Scroll suave (Smooth Scrolling) para la navegación interna.
  3. Micro-interacciones (Hover en tarjetas de precio).
  
  AUTORES: Edwin, Danielito, Alex, Matias
  =============================================================================================
*/

// Usamos 'DOMContentLoaded' para asegurar que el DOM (Estructura HTML) esté
// completamente cargado antes de intentar manipular elementos. Esto evita errores de "null reference".
document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. LÓGICA DEL MENÚ DE NAVEGACIÓN MÓVIL
    // =========================================================
    const menuToggle = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navButtons = document.getElementById('navButtons');

    // Validación defensiva: Solo agregamos el evento si el botón existe
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Verificamos el estado actual (si está visible o no)
            const isFlex = navLinks.style.display === 'flex';
            
            if (isFlex) {
                // ACCIÓN: CERRAR MENÚ
                navLinks.style.display = '';
                navLinks.classList.remove('nav-active');
                
                navButtons.style.display = '';
                navButtons.classList.remove('nav-active');
                
                // Cambiamos el icono de vuelta a hamburguesa
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            } else {
                // ACCIÓN: ABRIR MENÚ
                navLinks.style.display = 'flex';
                navLinks.classList.add('nav-active');
                
                navButtons.style.display = 'flex';
                navButtons.classList.add('nav-active');
                
                // Ajustes de estilo específicos para el layout móvil
                navButtons.style.flexDirection = 'column';
                navButtons.style.marginTop = '10px';
                
                // Cambiamos el icono a una 'X' de cierre
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                menuToggle.setAttribute('aria-label', 'Cerrar menú');
            }
        });
    }

    // =========================================================
    // 2. SCROLL SUAVE (SMOOTH SCROLLING)
    // Mejora la experiencia de usuario (UX) al evitar saltos bruscos.
    // =========================================================
    const ctaLink = document.querySelector('.scroll-trigger');
    const targetSection = document.getElementById('casos');

    if(ctaLink && targetSection) {
        ctaLink.addEventListener('click', () => {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // =========================================================
    // 3. MICRO-INTERACCIÓN EN TARJETAS DE PRECIO
    // Petición de diseño para resaltar las cartas no populares.
    // Aunque se puede hacer con CSS (:hover), usar JS nos permite lógica condicional extra si fuera necesario.
    // =========================================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        // Evento: Mouse entra en la tarjeta
        card.addEventListener('mouseenter', () => {
            // Solo aplicamos el borde naranja si NO es la tarjeta 'popular' (que ya lo tiene)
            if(!card.classList.contains('popular')) {
                card.style.borderColor = '#F49D37'; // Color naranja corporativo
            }
        });

        // Evento: Mouse sale de la tarjeta
        card.addEventListener('mouseleave', () => {
            if(!card.classList.contains('popular')) {
                card.style.borderColor = '#eee'; // Vuelta al color original
            }
        });
    });

    console.log('Sistema MILETL inicializado correctamente. Versión v1.0');
});