/**
 * =============================================================================================
 * FINANCE CONTROLLER v1.0
 * Lógica: Filtrado de facturas y gestión de estados (Vencido, Pendiente, Pagado).
 * =============================================================================================
 */

class FinanceController {
    
    constructor() {
        // Base de Datos Mock (Exacta según mockup)
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

        this.dom = {
            tableBody: document.getElementById('financeTableBody'),
            searchInput: document.getElementById('searchInput'),
            tabsContainer: document.getElementById('filterTabs'),
            tabs: document.querySelectorAll('.tab-btn')
        };

        this.currentFilter = 'all';
        this.currentSearch = '';

        this.init();
    }

    init() {
        this.renderTable(this.invoices);
        this.setupListeners();
    }

    setupListeners() {
        // Búsqueda en tiempo real
        this.dom.searchInput.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Tabs de Filtro
        this.dom.tabsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                // UI Update
                this.dom.tabs.forEach(tab => tab.classList.remove('active'));
                e.target.classList.add('active');

                // Logic Update
                this.currentFilter = e.target.dataset.filter;
                this.applyFilters();
            }
        });
    }

    applyFilters() {
        const filtered = this.invoices.filter(invoice => {
            // Filtro de Texto (Cliente, Empresa o Factura)
            const matchesSearch = invoice.client.toLowerCase().includes(this.currentSearch) || 
                                  invoice.company.toLowerCase().includes(this.currentSearch) ||
                                  invoice.invoice.toLowerCase().includes(this.currentSearch);
            
            // Filtro de Estado
            const matchesStatus = this.currentFilter === 'all' || invoice.status === this.currentFilter;

            return matchesSearch && matchesStatus;
        });

        this.renderTable(filtered);
    }

    renderTable(data) {
        this.dom.tableBody.innerHTML = '';

        if (data.length === 0) {
            this.dom.tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: #9CA3AF;">No se encontraron facturas.</td></tr>`;
            return;
        }

        const rows = data.map(item => {
            const statusConfig = this.getStatusConfig(item);
            const initialsBg = this.getInitialsColor(item.status);

            return `
            <tr class="animate-fade">
                <td>
                    <div class="client-info">
                        <div class="client-initials ${initialsBg}">${item.initials}</div>
                        <div class="client-text">
                            <h4>${item.client}</h4>
                            <span>${item.company}</span>
                        </div>
                    </div>
                </td>
                <td class="invoice-id">${item.invoice}</td>
                <td class="date-text">${item.issueDate}</td>
                <td class="${statusConfig.dateClass}">
                    ${item.dueDate} ${statusConfig.extraInfo}
                </td>
                <td class="amount-text">${item.amount}</td>
                <td><span class="status-pill ${statusConfig.badgeClass}">${statusConfig.label}</span></td>
                <td>
                    <div class="action-group">
                        ${statusConfig.actions}
                        <button class="btn-action btn-detail"><i class="far fa-eye"></i> Ver Detalle</button>
                    </div>
                </td>
            </tr>
            `;
        }).join('');

        this.dom.tableBody.innerHTML = rows;
    }

    getStatusConfig(item) {
        switch(item.status) {
            case 'overdue':
                return {
                    label: 'Vencido',
                    badgeClass: 'st-overdue',
                    dateClass: 'overdue-date',
                    extraInfo: `(${item.daysOverdue} días)`,
                    actions: `<button class="btn-action btn-primary-soft"><i class="fas fa-check"></i> Registrar Pago</button>
                              <button class="btn-action btn-secondary-soft"><i class="far fa-envelope"></i> Recordatorio</button>`
                };
            case 'pending':
                return {
                    label: 'Pendiente',
                    badgeClass: 'st-pending',
                    dateClass: 'date-text',
                    extraInfo: '',
                    actions: `<button class="btn-action btn-primary-soft"><i class="fas fa-check"></i> Registrar Pago</button>
                              <button class="btn-action btn-secondary-soft"><i class="far fa-envelope"></i> Recordatorio</button>`
                };
            case 'paid':
                return {
                    label: 'Pagado',
                    badgeClass: 'st-paid',
                    dateClass: 'date-text',
                    extraInfo: '',
                    actions: `` // Pagadas solo muestran "Ver Detalle"
                };
            default: return {};
        }
    }

    getInitialsColor(status) {
        switch(status) {
            case 'overdue': return 'bg-orange-soft';
            case 'pending': return 'bg-orange-soft';
            case 'paid': return 'bg-orange-soft'; // Keeping consistent with mockup
            default: return 'bg-orange-soft';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FinanceController();
});