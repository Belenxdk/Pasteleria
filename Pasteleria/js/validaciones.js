
const REGEX_EMAIL = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
function mostrarError(inputId, errorId, mensaje) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (mensaje) {
    error.textContent = mensaje;
    input.classList.add('invalido');
    input.classList.remove('valido');
  } else {
    error.textContent = '';
    input.classList.remove('invalido');
    input.classList.add('valido');
  }
}


function validarRun(run) {
  run = run.trim().toUpperCase();
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);

  return dv === dvEsperado;
}

const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    let esValido = true;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (email === '') {
      mostrarError('email', 'error-email', 'El correo es obligatorio.');
      esValido = false;
    } else if (email.length > 100) {
      mostrarError('email', 'error-email', 'Máximo 100 caracteres.');
      esValido = false;
    } else if (!REGEX_EMAIL.test(email)) {
      mostrarError('email', 'error-email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
      esValido = false;
    } else {
      mostrarError('email', 'error-email', '');
    }
    if (password === '') {
      mostrarError('password', 'error-password', 'La contraseña es obligatoria.');
      esValido = false;
    } else if (password.length < 4 || password.length > 10) {
      mostrarError('password', 'error-password', 'Debe tener entre 4 y 10 caracteres.');
      esValido = false;
    } else {
      mostrarError('password', 'error-password', '');
    }

    if (esValido) {
      alert('¡Inicio de sesión exitoso! (simulado)');
      formLogin.reset();
    }
  });
}

const formRegistro = document.getElementById('form-registro');
if (formRegistro) {
  formRegistro.addEventListener('submit', function (e) {
    e.preventDefault();
    let esValido = true;

    const run = document.getElementById('run').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const password = document.getElementById('password').value;
    const asunto = document.getElementById('asunto').value.trim();

    if (run === '') {
      mostrarError('run', 'error-run', 'El RUN es obligatorio.');
      esValido = false;
    } else if (run.length < 7 || run.length > 9) {
      mostrarError('run', 'error-run', 'El RUN debe tener entre 7 y 9 caracteres.');
      esValido = false;
    } else if (!validarRun(run)) {
      mostrarError('run', 'error-run', 'El RUN ingresado no es válido.');
      esValido = false;
    } else {
      mostrarError('run', 'error-run', '');
    }


    if (nombre === '') {
      mostrarError('nombre', 'error-nombre', 'El nombre es obligatorio.');
      esValido = false;
    } else if (nombre.length > 50) {
      mostrarError('nombre', 'error-nombre', 'Máximo 50 caracteres.');
      esValido = false;
    } else {
      mostrarError('nombre', 'error-nombre', '');
    }

 
    if (apellidos === '') {
      mostrarError('apellidos', 'error-apellidos', 'Los apellidos son obligatorios.');
      esValido = false;
    } else if (apellidos.length > 100) {
      mostrarError('apellidos', 'error-apellidos', 'Máximo 100 caracteres.');
      esValido = false;
    } else {
      mostrarError('apellidos', 'error-apellidos', '');
    }

  
    if (email === '') {
      mostrarError('email', 'error-email', 'El correo es obligatorio.');
      esValido = false;
    } else if (email.length > 100) {
      mostrarError('email', 'error-email', 'Máximo 100 caracteres.');
      esValido = false;
    } else if (!REGEX_EMAIL.test(email)) {
      mostrarError('email', 'error-email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
      esValido = false;
    } else {
      mostrarError('email', 'error-email', '');
    }

    if (asunto === ''){
      mostrarError('asunto', 'error-asunto', 'El asunto no puede estar vacio.');
      esValido = false;
    }else if (asunto.length > 100){
       mostrarError('asunto', 'error-asunto', 'Maximo son 100 caracteres');
      esValido = false;
    } else{
      mostrarError('asunto', 'error-asunto', '');
    }

  
    if (direccion === '') {
      mostrarError('direccion', 'error-direccion', 'La dirección es obligatoria.');
      esValido = false;
    } else if (direccion.length > 300) {
      mostrarError('direccion', 'error-direccion', 'Máximo 300 caracteres.');
      esValido = false;
    }

    if (password === '') {
      mostrarError('password', 'error-password', 'La contraseña es obligatoria.');
      esValido = false;
    } else if (password.length < 4 || password.length > 10) {
      mostrarError('password', 'error-password', 'Debe tener entre 4 y 10 caracteres.');
      esValido = false;
    } else {
      mostrarError('password', 'error-password', '');
    }

    if (esValido) {
      alert('¡Registro exitoso! (simulado)');
      formRegistro.reset();
    }
  });
}

const formContacto = document.getElementById('form-contacto');
if (formContacto) {
  formContacto.addEventListener('submit', function (e) {
    e.preventDefault();
    let esValido = true;

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

   
    if (nombre === '') {
      mostrarError('nombre', 'error-nombre', 'El nombre es obligatorio.');
      esValido = false;
    } else if (nombre.length > 100) {
      mostrarError('nombre', 'error-nombre', 'Máximo 100 caracteres.');
      esValido = false;
    } else {
      mostrarError('nombre', 'error-nombre', '');
    }

    if (email === '') {
      mostrarError('email', 'error-email', 'El correo es obligatorio.');
      esValido = false;
    } else if (email.length > 100) {
      mostrarError('email', 'error-email', 'Máximo 100 caracteres.');
      esValido = false;
    } else if (!REGEX_EMAIL.test(email)) {
      mostrarError('email', 'error-email', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
      esValido = false;
    } else {
      mostrarError('email', 'error-email', '');
    }

 
    if (mensaje === '') {
      mostrarError('mensaje', 'error-mensaje', 'El mensaje es obligatorio.');
      esValido = false;
    } else if (mensaje.length > 500) {
      mostrarError('mensaje', 'error-mensaje', 'Máximo 500 caracteres.');
      esValido = false;
    } else {
      mostrarError('mensaje', 'error-mensaje', '');
    }

    if (esValido) {
      alert('¡Mensaje enviado! (simulado)');
      formContacto.reset();
    }
  });
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const contador = document.getElementById('carrito-contador');
  if (contador) contador.textContent = totalItems;
}
actualizarContadorCarrito();
