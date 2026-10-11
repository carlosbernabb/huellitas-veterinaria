/* ===========================================================
   contacto.js
   Validación del formulario y mapa interactivo con Leaflet
   =========================================================== */

const formulario = document.getElementById('form-contacto');
const campoMensaje = document.getElementById('mensaje');

// Reglas de validación de cada campo
const reglas = {
  nombre: function (valor) {
    if (valor === '') return 'Escribe tu nombre.';
    if (valor.length < 3) return 'El nombre debe tener al menos 3 letras.';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(valor)) return 'El nombre solo puede llevar letras.';
    return '';
  },
  correo: function (valor) {
    if (valor === '') return 'Escribe tu correo.';
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(valor)) return 'El correo no tiene un formato válido.';
    return '';
  },
  asunto: function (valor) {
    if (valor === '') return 'Elige un asunto.';
    return '';
  },
  mensaje: function (valor) {
    if (valor === '') return 'Escribe tu mensaje.';
    if (valor.length < 15) return 'El mensaje debe tener al menos 15 caracteres.';
    return '';
  }
};

// Valida un campo y muestra el error debajo de él
function validarCampo(campo) {
  const error = reglas[campo.name](campo.value.trim());
  const contenedor = campo.closest('.campo');

  contenedor.querySelector('.mensaje-error').textContent = error;
  contenedor.classList.toggle('error', error !== '');
  contenedor.classList.toggle('ok', error === '');
  return error === '';
}

// Cada campo se revisa cuando el usuario sale de él
Object.keys(reglas).forEach(function (nombre) {
  const campo = formulario.elements[nombre];
  campo.addEventListener('blur', function () { validarCampo(campo); });
  campo.addEventListener('input', function () {
    if (campo.closest('.campo').classList.contains('error')) validarCampo(campo);
  });
});

// Al enviar se revisan todos los campos
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  let todoBien = true;
  Object.keys(reglas).forEach(function (nombre) {
    if (!validarCampo(formulario.elements[nombre])) todoBien = false;
  });

  if (!todoBien) {
    // Se lleva al usuario al primer campo con error
    const primerError = formulario.querySelector('.campo.error input, .campo.error select, .campo.error textarea');
    primerError.focus();
    return;
  }

  // Mensaje de éxito con jQuery
  const nombre = formulario.elements.nombre.value.trim().split(' ')[0];
  $('#aviso-exito').stop(true, true)
    .html('¡Gracias ' + nombre + '! Recibimos tu mensaje y te responderemos en menos de 24 horas.')
    .slideDown(300)
    .delay(5000)
    .slideUp(300);

  formulario.reset();
  formulario.querySelectorAll('.campo').forEach(function (c) { c.classList.remove('ok', 'error'); });
  document.getElementById('contador-caracteres').textContent = '0';
});

// Contador de caracteres del mensaje con jQuery
$('#mensaje').on('input', function () {
  const total = $(this).val().length;
  $('#contador-caracteres').text(total).css('color', total > 350 ? '#e04848' : '');
});

// Mapa interactivo con Leaflet y OpenStreetMap
const ubicacion = [20.5937, -100.3926];
const mapa = L.map('mapa').setView(ubicacion, 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(mapa);

L.marker(ubicacion)
  .addTo(mapa)
  .bindPopup('<strong>Huellitas Clínica Veterinaria</strong><br>Av. Zaragoza 215, Centro')
  .openPopup();
