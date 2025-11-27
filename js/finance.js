/**
 * =============================================================================================
 * FINANCE CONTROLLER v1.1
 * Lógica: Filtrado de facturas y gestión de estados (Vencido, Pendiente, Pagado).
 * Adaptado para renderizar tarjetas en lugar de una tabla.
 * =============================================================================================
 */

class FinanceController {
    
    constructor() {
        // Base de Datos Mock
        this.invoices = [
            { id: 1, client: 'María González', company: 'Tech Solutions S.A.C.', invoice: '#4578', issueDate: '01/10/2025', dueDate: '15/10/2025', daysOverdue: 6, amount: 'S/ 15,420.00', status: 'overdue', initials: 'MG' },
            { id: 2, client: 'Carlos Ramírez', company: 'Distribuidora Norte', invoice: '#4579', issueDate: '05/10/2025', dueDate: '18/10/2025', daysOverdue: 3, amount: 'S/ 8,950.00', status: 'overdue', initials: 'CR' },
            { id: 3, client: 'Ana Torres', company: 'Comercial Sur E.I.R.L.', invoice: '#4580', issueDate: '08/10/2025', dueDate: '20/10/2025', daysOverdue: 1, amount: 'S/ 12,300.00', status: 'overdue', initials: 'AT' },
            { id: 4, client: 'Roberto Silva', company: 'Importaciones RP S.A.C.', invoice: '#4581', issueDate: '10/10/2025', dueDate: '25/10/2025', amount: 'S/ 18,750.00', status: 'pending', initials: 'RS' },
            { id: 5, client: 'Patricia Mendoza', company: 'Corporación PME', invoice: '#4582', issueDate: '12/10/2025', dueDate: '30/10/2025', amount: 'S/ 9,500.00', status: 'pending', initials: 'PM' },
            { id: 6, client: 'Luis Vargas', company: 'Logística Express', invoice: '#4583', issueDate: '15/10/2025', dueDate: '05/11/2025', amount: 'S/ 22,100.00', status: 'pending', initials: 'LV' },
            { id: 7, client: 'Carmen Flores', company: 'Servicios CF S.A.', invoice: '#4584', issueDate: '20/09/2025', dueDate: '05/10/2025', amount: 'S/ 14,800.00', status: 'paid', initials: 'CF' },
            { id: 8, client: 'Jorge Castillo', company: 'Industrias JC', invoice: '#4585', issueDate: '25/09/2025', dueDate: '10/10/2025', amount: 'S/ 19,200.00', status: 'paid', initials: 'JC' }
        ];

        // Mapeo del DOM según finance.html y finance.css
        this.dom = {
            invoiceContainer: document.getElementById('invoice-list'),
            filterContainer: document.querySelector('.tabs-container'),
            filterButtons: document.querySelectorAll('.tab-btn')
        };

        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderInvoices(this.invoices);
        this.setupListeners();
    }

    setupListeners() {
        // Listener para los botones de filtro
        this.dom.filterContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.tab-btn');
            if (target) {
                // Actualizar UI de los botones
                this.dom.filterButtons.forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');

                // Actualizar lógica de filtro
                this.currentFilter = target.dataset.filter;
                this.applyFilters();
            }
        });
    }

    applyFilters() {
        let filteredInvoices;

        if (this.currentFilter === 'all') {
            filteredInvoices = this.invoices;
        } else {
            filteredInvoices = this.invoices.filter(invoice => invoice.status === this.currentFilter);
        }

        this.renderInvoices(filteredInvoices);
    }

    renderInvoices(data) {
        this.dom.invoiceContainer.innerHTML = '';

        if (data.length === 0) {
            this.dom.invoiceContainer.innerHTML = `<p class="empty-state">No se encontraron facturas para el filtro seleccionado.</p>`;
            return;
        }

        const invoiceCards = data.map(item => {
            const statusConfig = this.getStatusConfig(item);
            
            return `
                <div class="invoice-card animate-fade" data-status="${item.status}">
                    <div class="card-header">
                        <div class="client-details">
                            <span class="client-name">${item.client}</span>
                            <span class="client-company">${item.company}</span>
                        </div>
                        <span class="invoice-amount">${item.amount}</span>
                    </div>
                    <div class="card-body">
                        <div class="invoice-info">
                            <span>Factura: ${item.invoice}</span>
                            <span>Emisión: ${item.issueDate}</span>
                        </div>
                        <div class="due-info">
                            <span class="${statusConfig.dateClass}">Vencimiento: ${item.dueDate} ${statusConfig.extraInfo}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="status-pill ${statusConfig.badgeClass}">${statusConfig.label}</span>
                    </div>
                </div>
            `;
        }).join('');

        this.dom.invoiceContainer.innerHTML = invoiceCards;
    }

    getStatusConfig(item) {
        switch(item.status) {
            case 'overdue':
                return {
                    label: 'Vencido',
                    badgeClass: 'st-overdue',
                    dateClass: 'overdue-date',
                    extraInfo: `(${item.daysOverdue} días)`
                };
            case 'pending':
                return {
                    label: 'Pendiente',
                    badgeClass: 'st-pending',
                    dateClass: 'date-text',
                    extraInfo: ''
                };
            case 'paid':
                return {
                    label: 'Pagado',
                    badgeClass: 'st-paid',
                    dateClass: 'date-text',
                    extraInfo: ''
                };
            default: return {};
        }
    }
}

// Inicializar el controlador cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', () => {
    new FinanceController();
});
