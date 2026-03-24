// ========== VARIABLES GLOBALES ==========
// Arrays para almacenar datos de sugerencias y representantes
let temaActual = 'dark';

// Información del administrador actual
let adminActual = { nombre: 'Administrador', iniciales: 'AD', contraseña: 'admin123' };

// ========== INFORMACIÓN DEL USUARIO AUTENTICADO ==========
// Esta variable almacena los datos del usuario que ha iniciado sesión
let usuarioAutenticado = null;
let rolAutenticado = null;

conectarFirebase()

// ========== CONEXIÓN CON FIREBASE ==========
// Esta función establece la conexión con Firebase y carga los datos
function conectarFirebase() {
  // Verificar que Firebase esté disponible
  if (!window.firebase || !window.firebase.database) {
    console.error('Firebase no está disponible. Verifica tu configuración.');
    mostrarNotificacion('Error: No se pudo conectar con Firebase', 'error');
    return;
  }

  const { database, ref, onValue } = window.firebase;

  

  mostrarNotificacion('Conectado a Firebase correctamente', 'success');
}


// ========== NOTIFICACIONES (TOASTS) ==========
// Muestra una notificación temporal en la esquina inferior derecha
function mostrarNotificacion(mensaje, tipo = 'info') {
  const contenedor = document.getElementById('toast-container');
  // Colores según el tipo de notificación
  const colores = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-blue-500' };
  // Iconos según el tipo
  const iconos = { success: '✓', error: '✕', info: 'ℹ' };

  const notificacion = document.createElement('div');
  notificacion.className = `toast flex items-center gap-3 px-4 py-3 ${colores[tipo]} text-white rounded-xl shadow-lg`;
  notificacion.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">${iconos[tipo]}</span>
    <span class="font-medium">${mensaje}</span>
  `;

  contenedor.appendChild(notificacion);
  // Desaparecer después de 3 segundos
  setTimeout(() => {
    notificacion.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => notificacion.remove(), 300);
  }, 3000);
}

// ========== FUNCIONES DE AUTENTICACIÓN ==========

// Cambiar rol en la pantalla de login (Admin o Representante)
function cambiarRolLogin(rol) {
  const btnAdmin = document.getElementById('btn-rol-admin');
  const btnRep = document.getElementById('btn-rol-rep');
  const seccionAdmin = document.getElementById('login-admin-section');
  const seccionRep = document.getElementById('login-representante-section');

  if (rol === 'admin') {
    // Mostrar formulario de administrador
    btnAdmin.classList.add('bg-red-500');
    btnAdmin.classList.remove('bg-slate-700/50', 'text-slate-300', 'hover:bg-slate-700');
    btnAdmin.classList.add('text-white');
    
    btnRep.classList.remove('bg-red-500', 'text-white', 'bg-purple-500');
    btnRep.classList.add('bg-slate-700/50', 'text-slate-300', 'hover:bg-slate-700');
    
    seccionAdmin.classList.remove('hidden');
    seccionRep.classList.add('hidden');
  } else {
    // Mostrar formulario de representante
    btnRep.classList.add('bg-purple-500');
    btnRep.classList.remove('bg-slate-700/50', 'text-slate-300', 'hover:bg-slate-700');
    btnRep.classList.add('text-white');
    
    btnAdmin.classList.remove('bg-purple-500', 'bg-red-500', 'text-white');
    btnAdmin.classList.add('bg-slate-700/50', 'text-slate-300', 'hover:bg-slate-700');
    
    seccionRep.classList.remove('hidden');
    seccionAdmin.classList.add('hidden');
  }
}

// ========== LOGIN DEL ADMINISTRADOR ==========
// Valida las credenciales del administrador contra Firebase
function loginAdministrador() {
  const email = document.getElementById('login-admin-email').value.trim();
  const password = document.getElementById('login-admin-password').value.trim();

  // Validaciones básicas
  if (!email || !password) {
    mostrarToastLogin('Por favor completa todos los campos', 'error');
    return;
  }

  // Validación de email
  //const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //if (!regexEmail.test(email)) {
  //  mostrarToastLogin('Por favor ingresa un email válido', 'error');
  //  return;
  //}

  // Simulamos una validación de credenciales (en producción, consultarías Firebase)
  // Para este demo: admin@ejemplo.com / password123
  if (email === 'admin' && password === '123') {
    // Guardar sesión en localStorage
    const datosUsuario = {
      usuario: {
        nombre: 'Administrador',
        email: email,
        iniciales: 'AD'
      },
      rol: 'admin'
    };
    localStorage.setItem('usuarioAutenticado', JSON.stringify(datosUsuario));
    usuarioAutenticado = datosUsuario.usuario;
    rolAutenticado = 'admin';
    
    mostrarToastLogin('¡Bienvenido, Administrador!', 'success');
    setTimeout(mostrarPanelPrincipal, 1000);
  } else {
    mostrarToastLogin('Credenciales inválidas', 'error');
  }
}

function mostrarPanelPrincipal() {
  window.location.href = 'html/panel_admin.html';
}

// ========== LOGIN DEL REPRESENTANTE ==========
// Valida las credenciales del representante contra la lista de Firebase
function loginRepresentante() {
  const usuario = document.getElementById('login-rep-usuario').value.trim();
  const password = document.getElementById('login-rep-password').value.trim();

  // Validaciones básicas
  if (!usuario || !password) {
    mostrarToastLogin('Por favor completa todos los campos', 'error');
    return;
  }

  if (usuario.length < 3) {
    mostrarToastLogin('El usuario debe tener al menos 3 caracteres', 'error');
    return;
  }

  // Buscar representante en la lista (simulado con array local)
  // En producción, consultarías Firebase
  //const repEncontrado = representantes.find(r => r.usuario === usuario);

  //if (!repEncontrado) {
    //mostrarToastLogin('Usuario no encontrado', 'error');
    //return;
  //}

  if (usuario == "admin" && password == "123") { 

    // Guardar sesión en localStorage
    //const datosUsuario = {
    //  usuario: {
    //    nombre: repEncontrado.nombre,
    //    usuario: repEncontrado.usuario,
    //    id: repEncontrado.id
    //  },
    //  rol: 'representante'
    //};
    //localStorage.setItem('usuarioAutenticado', JSON.stringify(datosUsuario));
    //usuarioAutenticado = datosUsuario.usuario;
    rolAutenticado = 'representante';
    
    mostrarToastLogin(`¡Bienvenido, ${usuario}!`, 'success');
    setTimeout(() => {window.location.href = 'html/panel_usuario.html';}, 1000);
  }
}


// ========== TOAST PARA PANTALLA DE LOGIN ==========
// Notificaciones especiales para la pantalla de login
function mostrarToastLogin(mensaje, tipo = 'info') {
  const loginScreen = document.getElementById('login-screen');
  const colores = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-blue-500' };
  const iconos = { success: '✓', error: '✕', info: 'ℹ' };

  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 ${colores[tipo]} text-white rounded-xl shadow-lg animate-slide-in z-50`;
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">${iconos[tipo]}</span>
    <span class="font-medium">${mensaje}</span>
  `;

  loginScreen.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}



// ========== CERRAR MODALES AL PRESIONAR ESC ==========
// Permite cerrar cualquier modal presionando la tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('account-modal').classList.add('hidden');
    document.getElementById('logout-modal').classList.add('hidden');
    document.getElementById('create-representative-modal').classList.add('hidden');
    document.getElementById('response-modal').classList.add('hidden');
    document.getElementById('edit-representative-modal').classList.add('hidden');
  }
});