$(function () {

  // Slider
  $('.slider-principal').bxSlider({
    auto: true,
    pause: 5000,
    mode: 'fade',
    autoHover: true,
    touchEnabled: false
  });

  // Contadores
  let yaContaron = false;

  $(window).on('scroll', function () {
    const inicioContadores = $('.contadores').offset().top - $(window).height();

    if (!yaContaron && $(window).scrollTop() > inicioContadores) {
      yaContaron = true;

      $('.contador').each(function () {
        const $numero = $(this);
        const final = $numero.data('final');

        $({ valor: 0 }).animate({ valor: final }, {
          duration: 2000,
          step: function () {
            $numero.text(Math.floor(this.valor));
          },
          complete: function () {
            $numero.text(final);
          }
        });
      });
    }
  });

  // El tamaño solo aplica para perros
  $('#especie').on('change', function () {
    if ($(this).val() === 'gato') {
      $('#campo-tamano').slideUp();
    } else {
      $('#campo-tamano').slideDown();
    }
  });

  // Calculadora de edad
  $('#form-edad').on('submit', function (e) {
    e.preventDefault();

    const especie = $('#especie').val();
    const tamano = $('#tamano').val();
    const edad = Number($('#edad').val());

    if (edad < 1 || edad > 25) {
      $('#error-edad').text('Escribe una edad entre 1 y 25 años.');
      $('#resultado-edad').slideUp();
      return;
    }

    $('#error-edad').text('');

    let porAnio = 4;
    if (especie === 'perro' && tamano === 'mediano') porAnio = 5;
    if (especie === 'perro' && tamano === 'grande') porAnio = 7;

    let edadHumana;
    if (edad === 1) {
      edadHumana = 15;
    } else if (edad === 2) {
      edadHumana = 24;
    } else {
      edadHumana = 24 + (edad - 2) * porAnio;
    }

    let etapa = 'joven';
    if (edadHumana >= 25) etapa = 'adulto';
    if (edadHumana >= 50) etapa = 'adulto maduro';
    if (edadHumana >= 70) etapa = 'senior';

    let nombre = 'Tu perro';
    if (especie === 'gato') nombre = 'Tu gato';

    $('#resultado-edad').hide().html(
      nombre + ' tiene aproximadamente<br><strong>' + edadHumana + ' años humanos</strong><br>Etapa de vida: ' + etapa
    ).fadeIn();
  });
});
