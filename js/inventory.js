/**
 * =============================================================================================
 * INVENTORY CONTROLLER v1.0
 * Lógica: Filtrado en tiempo real y Gestión de Stock (Mock).
 * =============================================================================================
 */

class InventoryController {
    
    constructor() {
        // Base de Datos Mock
        this.products = [
            { id: 1, name: 'Laptop Dell Inspiron 15', sku: 'SKU-2847', category: 'Electrónica', stock: 45, unit: 'Unidades', status: 'sufficient', initials: 'LP' },
            { id: 2, name: 'Silla Ergonómica Pro', sku: 'SKU-3921', category: 'Muebles', stock: 8, unit: 'Unidades', status: 'critical', initials: 'SE' },
            { id: 3, name: 'Mouse Inalámbrico Logitech', sku: 'SKU-1523', category: 'Electrónica', stock: 67, unit: 'Unidades', status: 'sufficient', initials: 'MS' },
            { id: 4, name: 'Escritorio de Oficina', sku: 'SKU-4562', category: 'Muebles', stock: 12, unit: 'Unidades', status: 'low', initials: 'ES' },
            { id: 5, name: 'Cable HDMI 2m', sku: 'SKU-7823', category: 'Electrónica', stock: 125, unit: 'Unidades', status: 'sufficient', initials: 'CB' },
            { id: 6, name: 'Monitor Samsung 24"', sku: 'SKU-9012', category: 'Electrónica', stock: 28, unit: 'Unidades', status: 'sufficient', initials: 'MN' },
            { id: 7, name: 'Teclado Mecánico RGB', sku: 'SKU-3456', category: 'Electrónica', stock: 42, unit: 'Unidades', status: 'sufficient', initials: 'TC' },
            { id: 8, name: 'Archivador Metálico', sku: 'SKU-6789', category: 'Muebles', stock: 7, unit: 'Unidades', status: 'critical', initials: 'AR' },
            { id: 9, name: 'Lámpara LED Escritorio', sku: 'SKU-2345', category: 'Iluminación', stock: 56, unit: 'Unidades', status: 'sufficient', initials: 'LM' },
            { id: 10, name: 'Papel Bond A4 (Caja)', sku: 'SKU-8901', category: 'Papelería', stock: 89, unit: 'Cajas', status: 'sufficient', initials: 'PB' }
        ];

        this.dom = {
            tableBody: document.getElementById('inventoryTableBody'),
            searchInput: document.getElementById('searchInput'),
            filterContainer: document.getElementById('filterContainer'),
            filterButtons: document.querySelectorAll('.pill')
        };

        this.currentFilter = 'all';
        this.currentSearch = '';

        this.init();
    }

    init() {
        this.renderTable(this.products);
        this.setupListeners();
    }

    setupListeners() {
        // Búsqueda en tiempo real
        this.dom.searchInput.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Filtros por estado
        this.dom.filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill')) {
                // UI Update
                this.dom.filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Logic Update
                this.currentFilter = e.target.dataset.filter;
                this.applyFilters();
            }
        });
    }

    applyFilters() {
        const filtered = this.products.filter(product => {
            // Filtro de Texto
            const matchesSearch = product.name.toLowerCase().includes(this.currentSearch) || 
                                  product.sku.toLowerCase().includes(this.currentSearch);
            
            // Filtro de Estado
            const matchesStatus = this.currentFilter === 'all' || product.status === this.currentFilter;

            return matchesSearch && matchesStatus;
        });

        this.renderTable(filtered);
    }

    renderTable(data) {
        this.dom.tableBody.innerHTML = '';

        if (data.length === 0) {
            this.dom.tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 30px; color: #9CA3AF;">No se encontraron productos.</td></tr>`;
            return;
        }

        const rows = data.map(product => {
            const statusLabel = this.getStatusLabel(product.status);
            const statusClass = `status-${product.status}`; // e.g., status-low
            const bgClass = this.getBgClass(product.status); // Para el icono

            return `
            <tr class="animate-row">
                <td>
                    <div class="product-cell">
                        <div class="prod-icon ${bgClass}">${product.initials}</div>
                        <div class="prod-info">
                            <h4>${product.name}</h4>
                            <span>${product.sku}</span>
                        </div>
                    </div>
                </td>
                <td><span class="category-tag">${product.category}</span></td>
                <td><span class="stock-val">${product.stock}</span></td>
                <td>${product.unit}</td>
                <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
                <td>
                    <button class="action-btn" title="Editar"><i class="fas fa-pen"></i></button>
                    <button class="action-btn" title="Historial"><i class="fas fa-clock"></i></button>
                    <button class="action-btn" title="Eliminar"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
            `;
        }).join('');

        this.dom.tableBody.innerHTML = rows;
    }

    getStatusLabel(status) {
        switch(status) {
            case 'sufficient': return 'Suficiente';
            case 'low': return 'Bajo';
            case 'critical': return 'Crítico';
            default: return status;
        }
    }

    getBgClass(status) {
        switch(status) {
            case 'sufficient': return 'bg-orange-light';
            case 'low': return 'bg-orange-light'; // Mismo estilo visual que mockup
            case 'critical': return 'bg-orange-light';
            default: return 'bg-gray-light';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new InventoryController();
});