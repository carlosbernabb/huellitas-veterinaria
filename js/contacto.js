const formulario = document.getElementById('form-contacto');

function mostrarError(id, mensaje) {
  const campo = document.getElementById(id).parentElement;
  campo.querySelector('.mensaje-error').textContent = mensaje;

  if (mensaje === '') {
    campo.classList.remove('error');
    campo.classList.add('ok');
  } else {
    campo.classList.remove('ok');
    campo.classList.add('error');
  }
}

// Validación del formulario
function validar() {
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const asunto = document.getElementById('asunto').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  let valido = true;

  if (nombre.length < 3) {
    mostrarError('nombre', 'Escribe tu nombre, mínimo 3 letras.');
    valido = false;
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre)) {
    mostrarError('nombre', 'El nombre solo puede llevar letras.');
    valido = false;
  } else {
    mostrarError('nombre', '');
  }

  if (!/^\S+@\S+\.\S+$/.test(correo)) {
    mostrarError('correo', 'Escribe un correo válido.');
    valido = false;
  } else {
    mostrarError('correo', '');
  }

  if (asunto === '') {
    mostrarError('asunto', 'Elige un asunto.');
    valido = false;
  } else {
    mostrarError('asunto', '');
  }

  if (mensaje.length < 15) {
    mostrarError('mensaje', 'El mensaje debe tener al menos 15 caracteres.');
    valido = false;
  } else {
    mostrarError('mensaje', '');
  }

  return valido;
}

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validar()) return;

  const nombre = document.getElementById('nombre').value.trim().split(' ')[0];
  $('#aviso-exito')
    .text('¡Gracias ' + nombre + '! Recibimos tu mensaje y te responderemos pronto.')
    .slideDown()
    .delay(4000)
    .slideUp();

  formulario.reset();
  $('.campo').removeClass('ok error');
  $('#contador-caracteres').text(0);
});

// Contador de caracteres
$('#mensaje').on('input', function () {
  $('#contador-caracteres').text($(this).val().length);
});

// Mapa
const mapa = L.map('mapa').setView([20.5937, -100.3926], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(mapa);

L.marker([20.5937, -100.3926])
  .addTo(mapa)
  .bindPopup('<strong>Huellitas</strong><br>Av. Zaragoza 215, Centro')
  .openPopup();
