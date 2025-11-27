/**
 * =============================================================================================
 * NEW REGISTER CONTROLLER
 * Lógica: Manejo de formulario de registro y almacenamiento local.
 * =============================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('newRegisterForm');
    const passInput = document.getElementById('regPassword');
    const toggleBtn = document.getElementById('togglePassBtn');

    // 1. Mostrar/Ocultar Password
    if(toggleBtn && passInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);
            
            // Cambiar icono
            const icon = toggleBtn.querySelector('i');
            if(type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }

    // 2. Manejo del Submit
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = passInput.value;

            // Validación simple
            if(password.length < 6) {
                alert("La contraseña debe tener al menos 6 caracteres.");
                return;
            }

            // Simulación de guardado
            // En una app real, aquí harías un fetch() a tu API
            
            // Obtener usuarios previos
            let users = JSON.parse(localStorage.getItem('miletl_users')) || [];
            
            // Verificar duplicados
            if(users.some(u => u.email === email)) {
                alert("Este correo ya está registrado.");
                return;
            }

            // Crear usuario
            const newUser = {
                name: name,
                email: email,
                password: password, // Solo prototipo
                role: 'user'
            };

            users.push(newUser);
            localStorage.setItem('miletl_users', JSON.stringify(users));

            // Feedback visual
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
            btn.disabled = true;

            setTimeout(() => {
                alert("¡Cuenta creada con éxito!");
                window.location.href = 'login.html';
            }, 1500);
        });
    }
});