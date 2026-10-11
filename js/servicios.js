$(function () {

  let categoria = 'todos';

  // Buscador y filtros
  function filtrar() {
    const texto = $('#buscador').val().toLowerCase();
    let encontrados = 0;

    $('.servicio').each(function () {
      const contenido = $(this).text().toLowerCase();
      const mismaCategoria = categoria === 'todos' || $(this).data('categoria') === categoria;

      if (contenido.includes(texto) && mismaCategoria) {
        $(this).fadeIn();
        encontrados++;
      } else {
        $(this).fadeOut();
      }
    });

    $('#total-servicios').text('Mostrando ' + encontrados + ' de ' + $('.servicio').length + ' servicios');

    if (encontrados === 0) {
      $('#sin-resultados').show();
    } else {
      $('#sin-resultados').hide();
    }
  }

  $('#buscador').on('input', filtrar);

  $('.filtro').on('click', function () {
    $('.filtro').removeClass('activo');
    $(this).addClass('activo');
    categoria = $(this).data('categoria');
    filtrar();
  });

  filtrar();

  // Preguntas frecuentes
  $('.pregunta button').on('click', function () {
    const $pregunta = $(this).parent();

    if ($pregunta.hasClass('abierta')) {
      $pregunta.removeClass('abierta').find('.respuesta').slideUp();
    } else {
      $('.pregunta').removeClass('abierta').find('.respuesta').slideUp();
      $pregunta.addClass('abierta').find('.respuesta').slideDown();
    }
  });
});
