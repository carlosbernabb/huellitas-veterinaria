/* ===========================================================
   servicios.js
   Buscador, filtros por categoría y preguntas frecuentes
   =========================================================== */

$(function () {

  let categoriaActual = 'todos';

  // Muestra solo los servicios que coinciden con el texto y la categoría
  function filtrarServicios() {
    const texto = normalizar($('#buscador').val());
    let visibles = 0;

    $('.servicio').each(function () {
      const $tarjeta = $(this);
      const contenido = normalizar($tarjeta.text());
      const coincideTexto = contenido.includes(texto);
      const coincideCategoria = categoriaActual === 'todos' || $tarjeta.data('categoria') === categoriaActual;

      if (coincideTexto && coincideCategoria) {
        $tarjeta.stop(true, true).fadeIn(250);
        visibles++;
      } else {
        $tarjeta.stop(true, true).fadeOut(250);
      }
    });

    // Se actualiza el texto con el número de resultados
    $('#total-servicios').text('Mostrando ' + visibles + ' de ' + $('.servicio').length + ' servicios');
    $('#sin-resultados').toggle(visibles === 0);
  }

  // Quita acentos y mayúsculas para que la búsqueda sea más fácil
  function normalizar(cadena) {
    return cadena.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  $('#buscador').on('input', filtrarServicios);

  $('.filtro').on('click', function () {
    $('.filtro').removeClass('activo');
    $(this).addClass('activo');
    categoriaActual = $(this).data('categoria');
    filtrarServicios();
  });

  filtrarServicios();

  // Acordeón, al abrir una pregunta se cierran las demás
  $('.pregunta button').on('click', function () {
    const $pregunta = $(this).parent();
    const estabaAbierta = $pregunta.hasClass('abierta');

    $('.pregunta').removeClass('abierta').find('.respuesta').slideUp(250);
    $('.pregunta span').text('+');

    if (!estabaAbierta) {
      $pregunta.addClass('abierta').find('.respuesta').slideDown(250);
      $(this).find('span').text('−');
    }
  });
});
