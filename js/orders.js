/**
 * =============================================================================================
 * ORDERS CONTROLLER v1.0
 * Lógica: Gestión de pedidos, visualización de urgencias y filtrado por estado.
 * =============================================================================================
 */

class OrdersController {
    
    constructor() {
        // Mock Data: Pedidos Urgentes
        this.urgentOrders = [
            { id: '#001234', client: 'María González', date: '10/10/2025', courier: 'Olva Courier', tracking: 'TRK-345678', status: 'En Tránsito' },
            { id: '#001256', client: 'Carlos Rodríguez', date: '09/10/2025', courier: 'Shalom', tracking: 'TRK-456780', status: 'En Tránsito' },
            { id: '#001278', client: 'Ana Martínez', date: '11/10/2025', courier: 'Cruz del Sur Cargo', tracking: 'TRK-567890', status: 'En Tránsito' },
            { id: '#001291', client: 'Luis Fernández', date: '08/10/2025', courier: 'Olva Courier', tracking: 'TRK-678901', status: 'En Tránsito' },
            { id: '#001305', client: 'Patricia Morales', date: '10/10/2025', courier: 'Shalom', tracking: 'TRK-789012', status: 'En Tránsito' }
        ];

        // Mock Data: Pedidos Regulares
        this.regularOrders = [
            { id: '#001320', client: 'Jorge Ramírez', date: '14/10/2025', courier: 'Olva Courier', tracking: 'TRK-890123', status: 'En Tránsito' },
            { id: '#001335', client: 'Sofía Vega', date: '15/10/2025', courier: 'Shalom', tracking: 'TRK-901234', status: 'En Tránsito' },
            { id: '#001348', client: 'Ricardo Torres', date: '15/10/2025', courier: 'Cruz del Sur Cargo', tracking: 'TRK-012345', status: 'En Tránsito' }
        ];

        this.dom = {
            urgentBody: document.getElementById('urgentOrdersBody'),
            regularBody: document.getElementById('regularOrdersBody'),
            filters: document.querySelectorAll('.filter-card')
        };

        this.init();
    }

    init() {
        this.renderTable(this.urgentOrders, this.dom.urgentBody, true);
        this.renderTable(this.regularOrders, this.dom.regularBody, false);
        this.setupFilters();
    }

    setupFilters() {
        this.dom.filters.forEach(card => {
            card.addEventListener('click', () => {
                // UI Toggle
                this.dom.filters.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                const filter = card.dataset.filter;
                // En una app real, aquí filtraríamos los arrays. 
                // Por ahora solo es visual para el MVP.
                console.log(`Filtro activo: ${filter}`);
            });
        });
    }

    renderTable(data, container, isUrgent) {
        if (!container) return;
        
        container.innerHTML = data.map(order => `
            <tr>
                <td>
                    ${isUrgent ? '<span class="urgent-tag"><i class="fas fa-triangle-exclamation"></i> URGENTE</span>' : ''}
                    <span class="client-name">${order.client}</span>
                </td>
                <td class="order-id">${order.id}</td>
                <td>${order.date}</td>
                <td>
                    <div class="courier-info">
                        <i class="fas fa-truck-fast courier-icon"></i> ${order.courier}
                    </div>
                </td>
                <td><a href="#" class="tracking-pill">${order.tracking}</a></td>
                <td><span class="status-pill st-transit">${order.status}</span></td>
                <td>
                    <div class="actions-cell">
                        <button class="btn-track"><i class="fas fa-location-arrow"></i> Ver Rastreo</button>
                        <button class="btn-delivered"><i class="fas fa-check"></i> Entregado</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new OrdersController();
});