/* ===========================================================
   principal.js
   Funciones que se usan en todas las páginas del sitio
   =========================================================== */

// Muestra la fecha y la hora actual en la barra superior
function mostrarFechaHora() {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const hora = ahora.toLocaleTimeString('es-MX');
  const texto = fecha.charAt(0).toUpperCase() + fecha.slice(1) + ' · ' + hora;
  document.getElementById('fecha-hora').textContent = texto;
}

mostrarFechaHora();
setInterval(mostrarFechaHora, 1000);

// Año actual en el pie de página
document.querySelectorAll('.anio').forEach(function (elemento) {
  elemento.textContent = new Date().getFullYear();
});

// Tema oscuro, la elección se guarda en el navegador
const botonTema = document.getElementById('btn-tema');

function aplicarTema(oscuro) {
  document.body.classList.toggle('oscuro', oscuro);
  botonTema.textContent = oscuro ? '☀️' : '🌙';
}

let temaGuardado = null;
try { temaGuardado = localStorage.getItem('tema'); } catch (e) { }
aplicarTema(temaGuardado === 'oscuro');

botonTema.addEventListener('click', function () {
  const oscuro = !document.body.classList.contains('oscuro');
  aplicarTema(oscuro);
  try { localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro'); } catch (e) { }
});

// Parte hecha con jQuery
$(function () {

  // Menú de celular, se abre y se cierra con slideToggle
  $('.menu-toggle').on('click', function () {
    $('.menu').stop(true, true).slideToggle(250, function () {
      $(this).toggleClass('abierto').removeAttr('style');
    });
  });

  // Si la pantalla vuelve a ser grande se quita el estado del menú
  $(window).on('resize', function () {
    if ($(window).width() > 760) {
      $('.menu').removeClass('abierto').removeAttr('style');
    }
  });

  // Botón ir arriba, aparece con fadeIn al bajar
  const $botonArriba = $('#btn-arriba');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $botonArriba.fadeIn(200);
    } else {
      $botonArriba.fadeOut(200);
    }
  });

  $botonArriba.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});
