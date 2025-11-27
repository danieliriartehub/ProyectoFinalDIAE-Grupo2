/**
 * =============================================================================================
 * UPLOAD CONTROLLER v1.0
 * Lógica: Drag & Drop, Validación de Archivos (.xlsx) y Gestión de Estado.
 * =============================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias DOM
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const btnSelect = document.getElementById('btnSelectFile');
    const fileListContainer = document.getElementById('fileListContainer');
    const fileList = document.getElementById('fileList');
    const errorBanner = document.getElementById('errorBanner');
    const closeErrorBtn = document.getElementById('closeErrorBtn');
    const btnClearAll = document.getElementById('btnClearAll');
    const btnProcess = document.getElementById('btnProcess');

    // Estado local de archivos
    let uploadedFiles = [];

    // --- EVENTOS DRAG & DROP ---

    // Prevenir comportamientos por defecto
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Efectos visuales al arrastrar
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-active'), false);
    });

    // Manejar el Drop
    dropZone.addEventListener('drop', handleDrop, false);

    // Manejar clic en botón "Explorar"
    btnSelect.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFiles);

    // Cerrar alerta de error
    closeErrorBtn.addEventListener('click', () => errorBanner.classList.add('hidden'));

    // --- LÓGICA PRINCIPAL ---

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        validateAndAddFiles(files);
    }

    function handleFiles() {
        const files = this.files;
        validateAndAddFiles(files);
    }

    function validateAndAddFiles(files) {
        errorBanner.classList.add('hidden'); // Reiniciar error
        let invalidFileFound = false;

        [...files].forEach(file => {
            // 1. Validar extensión (.xlsx)
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                // 2. Evitar duplicados
                if (!uploadedFiles.some(f => f.name === file.name)) {
                    uploadedFiles.push(file);
                }
            } else {
                invalidFileFound = true;
            }
        });

        // Mostrar error si hubo alguno inválido
        if (invalidFileFound) {
            errorBanner.classList.remove('hidden');
            // Auto-ocultar después de 5 seg
            setTimeout(() => errorBanner.classList.add('hidden'), 5000);
        }

        updateUI();
    }

    // --- ACTUALIZACIÓN DE UI ---

    function updateUI() {
        // Limpiar lista
        fileList.innerHTML = '';

        if (uploadedFiles.length > 0) {
            fileListContainer.classList.remove('hidden');
            btnProcess.disabled = false;
            btnClearAll.disabled = false;

            // Renderizar cada archivo
            uploadedFiles.forEach((file, index) => {
                const li = document.createElement('li');
                li.className = 'file-item';
                li.innerHTML = `
                    <div class="file-info">
                        <i class="fas fa-file-excel file-icon"></i>
                        <div>
                            <div class="file-name">${file.name}</div>
                            <div class="file-size">${formatBytes(file.size)}</div>
                        </div>
                    </div>
                    <button class="btn-delete" onclick="removeFile(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                fileList.appendChild(li);
            });
        } else {
            fileListContainer.classList.add('hidden');
            btnProcess.disabled = true;
            btnClearAll.disabled = true;
        }
    }

    // --- UTILIDADES ---

    // Función global para que el HTML pueda llamarla
    window.removeFile = function(index) {
        uploadedFiles.splice(index, 1);
        updateUI();
    };

    btnClearAll.addEventListener('click', () => {
        if(confirm('¿Estás seguro de eliminar todos los archivos?')) {
            uploadedFiles = [];
            updateUI();
            fileInput.value = ''; // Limpiar input
        }
    });

    btnProcess.addEventListener('click', () => {
        const btn = btnProcess;
        const originalText = btn.innerHTML;
        
        // Simulación de carga
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        
        // Simular tiempo de proceso ETL
        setTimeout(() => {
            alert('¡Archivos procesados correctamente! Redirigiendo a la fase de análisis...');
            window.location.href = 'analysis.html';
        }, 2000);
    });

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
});