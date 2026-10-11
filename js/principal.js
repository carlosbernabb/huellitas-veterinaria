// Fecha y hora
function mostrarFechaHora() {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const hora = ahora.toLocaleTimeString('es-MX');
  document.getElementById('fecha-hora').textContent = fecha + ' · ' + hora;
}

mostrarFechaHora();
setInterval(mostrarFechaHora, 1000);

$(function () {

  // Tema oscuro
  if (localStorage.getItem('tema') === 'oscuro') {
    $('body').addClass('oscuro');
    $('#btn-tema i').toggleClass('fa-moon fa-sun');
  }

  $('#btn-tema').on('click', function () {
    $('body').toggleClass('oscuro');
    $('#btn-tema i').toggleClass('fa-moon fa-sun');

    if ($('body').hasClass('oscuro')) {
      localStorage.setItem('tema', 'oscuro');
    } else {
      localStorage.setItem('tema', 'claro');
    }
  });

  // Menú del celular
  $('.menu-toggle').on('click', function () {
    $('.menu').toggleClass('abierto');
  });

  // Botón ir arriba
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 300) {
      $('#btn-arriba').fadeIn();
    } else {
      $('#btn-arriba').fadeOut();
    }
  });

  $('#btn-arriba').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});
