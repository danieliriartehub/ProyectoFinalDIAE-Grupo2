/**
 * =============================================================================================
 * REGISTER CONTROLLER
 * Lógica: Captura datos del formulario y los almacena en localStorage.
 * NOTA DE SEGURIDAD: En un entorno de producción real, NUNCA se deben almacenar
 * contraseñas en localStorage. Esto es solo para fines de prototipado.
 * =============================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const registerForm = document.getElementById('registerForm');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('password');

    // 1. Lógica para Mostrar/Ocultar Contraseña
    if(togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Cambiar el icono (ojo abierto/cerrado)
            togglePasswordBtn.innerHTML = type === 'password' 
                ? '<i class="far fa-eye"></i>' 
                : '<i class="far fa-eye-slash"></i>';
        });
    }

    // 2. Lógica de Registro (Submit del Formulario)
    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga de la página

            // a) Capturar valores de los inputs
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase(); // Normalizar email
            const password = passwordInput.value;

            // b) Validación básica (aunque los atributos 'required' de HTML ya ayudan)
            if (!fullName || !email || !password || password.length < 6) {
                alert("Por favor, completa todos los campos correctamente.");
                return;
            }

            // c) Obtener usuarios existentes del localStorage (o iniciar array vacío)
            // Usamos la clave 'miletl_users' para guardar nuestra "base de datos" de usuarios.
            let users = JSON.parse(localStorage.getItem('miletl_users')) || [];

            // d) Verificar si el correo ya está registrado
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert("Este correo electrónico ya está registrado. Por favor, inicia sesión.");
                // Opcional: Redirigir al login
                // window.location.href = 'login.html';
                return;
            }

            // e) Crear nuevo objeto de usuario
            // Generamos un ID simple usando la fecha actual
            const newUser = {
                id: Date.now().toString(),
                name: fullName,
                email: email,
                password: password, // ADVERTENCIA: Solo para prototipos.
                role: 'user', // Rol por defecto
                createdAt: new Date().toISOString()
            };

            // f) Guardar el nuevo usuario
            users.push(newUser);
            localStorage.setItem('miletl_users', JSON.stringify(users));

            // g) Feedback y Redirección
            alert("¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.");
            
            // Limpiar formulario (opcional, ya que vamos a redirigir)
            registerForm.reset();

            // Redirigir al Login
            window.location.href = 'login.html';
        });
    }
});