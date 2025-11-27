/**
 * =============================================================================================
 * CASHFLOW CONTROLLER v1.0
 * Lógica: Mock Data para Ingresos/Egresos y Gestión de Tablas.
 * =============================================================================================
 */

class CashFlowController {
    
    constructor() {
        // Base de Datos Mock de Movimientos
        this.mockData = {
            ingresos: [
                { date: '01/10/2025', client: 'Comercial Torres SAC', invoice: 'FAC-2025-1840', concept: 'Pago factura venta de mercadería', amount: 'S/ 18,500' },
                { date: '03/10/2025', client: 'Supermercados Unidos', invoice: 'FAC-2025-1852', concept: 'Cobro pedido mayorista', amount: 'S/ 24,300' },
                { date: '05/10/2025', client: 'Distribuidora El Sol EIRL', invoice: 'FAC-2025-1865', concept: 'Pago anticipado pedido especial', amount: 'S/ 12,600' },
                { date: '07/10/2025', client: 'Importaciones Chavez SRL', invoice: 'FAC-2025-1878', concept: 'Liquidación factura pendiente', amount: 'S/ 15,200' },
                { date: '10/10/2025', client: 'Grupo Comercial Perú SA', invoice: 'FAC-2025-1892', concept: 'Cobro venta al contado', amount: 'S/ 21,800' },
                { date: '12/10/2025', client: 'Retail Express SAC', invoice: 'FAC-2025-1905', concept: 'Pago factura vencida septiembre', amount: 'S/ 9,400' },
                { date: '17/10/2025', client: 'Almacenes La Victoria SA', invoice: 'FAC-2025-1932', concept: 'Pago venta productos premium', amount: 'S/ 5,400' }
            ],
            egresos: [
                { date: '02/10/2025', client: 'Proveedora Industrial SAC', invoice: 'FAC-PI-5420', concept: 'Compra de materia prima', amount: 'S/ 22,150' },
                { date: '04/10/2025', client: 'Servicios Logísticos Express', invoice: 'REC-5892', concept: 'Servicio de transporte mensual', amount: 'S/ 8,750' },
                { date: '06/10/2025', client: 'Suministros Globales EIRL', invoice: 'FAC-SG-3201', concept: 'Pago insumos de embalaje', amount: 'S/ 5,600' },
                { date: '08/10/2025', client: 'Nómina Octubre 2025', invoice: 'PLANILLA-10-25', concept: 'Pago primera quincena empleados', amount: 'S/ 18,500' },
                { date: '11/10/2025', client: 'Servicios Públicos', invoice: 'REC-LUZ-10254', concept: 'Pago energía eléctrica', amount: 'S/ 3,420' },
                { date: '13/10/2025', client: 'Distribuidora Central SRL', invoice: 'FAC-DC-8932', concept: 'Compra productos terminados', amount: 'S/ 14,800' }
            ]
        };

        this.dom = {
            tableBody: document.getElementById('movementsTableBody'),
            btnIngresos: document.getElementById('btnIngresos'),
            btnEgresos: document.getElementById('btnEgresos'),
            applyBtn: document.querySelector('.apply-btn')
        };

        this.init();
    }

    init() {
        // Cargar vista inicial (Ingresos)
        this.renderTable('ingresos');
        this.setupListeners();
    }

    setupListeners() {
        // Toggle Buttons Logic
        this.dom.btnIngresos.addEventListener('click', () => {
            this.toggleView('ingresos');
        });

        this.dom.btnEgresos.addEventListener('click', () => {
            this.toggleView('egresos');
        });

        // Mock Filter Logic
        this.dom.applyBtn.addEventListener('click', () => {
            const originalText = this.dom.applyBtn.innerText;
            this.dom.applyBtn.innerText = 'Actualizando...';
            this.dom.applyBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                this.dom.applyBtn.innerText = originalText;
                this.dom.applyBtn.style.opacity = '1';
                alert('📊 Datos actualizados para el rango de fechas seleccionado.');
            }, 800);
        });
    }

    toggleView(type) {
        // Update UI State
        if (type === 'ingresos') {
            this.dom.btnIngresos.classList.add('active');
            this.dom.btnEgresos.classList.remove('active');
        } else {
            this.dom.btnEgresos.classList.add('active');
            this.dom.btnIngresos.classList.remove('active');
        }

        // Re-render Table
        this.renderTable(type);
    }

    renderTable(type) {
        const data = this.mockData[type];
        this.dom.tableBody.innerHTML = ''; // Clear previous data

        // Generate Rows
        const rows = data.map(item => `
            <tr class="animate-row">
                <td>${item.date}</td>
                <td><strong>${item.client}</strong></td>
                <td><span style="color:#6B7280">${item.invoice}</span></td>
                <td>${item.concept}</td>
                <td class="text-right amount-cell" style="color: ${type === 'ingresos' ? '#10B981' : '#EF4444'}">
                    ${type === 'egresos' ? '-' : ''} ${item.amount}
                </td>
            </tr>
        `).join('');

        this.dom.tableBody.innerHTML = rows;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CashFlowController();
});