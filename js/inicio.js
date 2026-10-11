/* ===========================================================
   inicio.js
   Slider con bxSlider, contadores y calculadora de edad
   =========================================================== */

$(function () {

  // Plugin bxSlider para el carrusel principal
  $('.slider-principal').bxSlider({
    auto: true,
    pause: 5000,
    speed: 700,
    mode: 'fade',
    controls: true,
    pager: true,
    autoHover: true,
    adaptiveHeight: true,
    touchEnabled: false
  });

  // Contadores que suben desde cero cuando aparecen en pantalla
  let contadoresIniciados = false;

  function iniciarContadores() {
    $('.contador').each(function () {
      const $contador = $(this);
      const final = parseInt($contador.data('final'), 10);

      $({ valor: 0 }).animate({ valor: final }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $contador.text(Math.floor(this.valor).toLocaleString('es-MX'));
        },
        complete: function () {
          $contador.text(final.toLocaleString('es-MX'));
        }
      });
    });
  }

  $(window).on('scroll load', function () {
    const posicion = $('.contadores').offset().top - $(window).height() + 80;
    if (!contadoresIniciados && $(window).scrollTop() > posicion) {
      contadoresIniciados = true;
      iniciarContadores();
    }
  });

  // El tamaño solo aplica para perros, para gatos se oculta
  $('#especie').on('change', function () {
    if ($(this).val() === 'gato') {
      $('#campo-tamano').slideUp(200);
    } else {
      $('#campo-tamano').slideDown(200);
    }
  });

  // Calculadora de edad en años humanos
  $('#form-edad').on('submit', function (evento) {
    evento.preventDefault();

    const especie = $('#especie').val();
    const tamano = $('#tamano').val();
    const edad = parseFloat($('#edad').val());
    const $resultado = $('#resultado-edad');

    if (isNaN(edad) || edad < 1 || edad > 25) {
      $('#error-edad').text('Escribe una edad entre 1 y 25 años.');
      $resultado.slideUp(200);
      return;
    }
    $('#error-edad').text('');

    const humana = calcularEdadHumana(especie, tamano, edad);
    const etapa = obtenerEtapa(humana);
    const nombre = especie === 'perro' ? 'Tu perro' : 'Tu gato';

    // Se crea el contenido del resultado y se muestra con un efecto
    $resultado.hide().html(
      nombre + ' tiene aproximadamente<br><strong>' + humana + ' años humanos</strong><br>Etapa de vida: ' + etapa
    ).fadeIn(400);
  });
});

// Calcula la edad equivalente, el primer año cuenta como 15 y el segundo como 9
function calcularEdadHumana(especie, tamano, edad) {
  let porAnio = 4;
  if (especie === 'perro') {
    if (tamano === 'mediano') porAnio = 5;
    if (tamano === 'grande') porAnio = 7;
  }

  let total;
  if (edad <= 1) {
    total = 15 * edad;
  } else if (edad <= 2) {
    total = 15 + 9 * (edad - 1);
  } else {
    total = 24 + (edad - 2) * porAnio;
  }
  return Math.round(total);
}

// Regresa la etapa de vida según la edad humana
function obtenerEtapa(edadHumana) {
  if (edadHumana < 25) return 'joven 🐾';
  if (edadHumana < 50) return 'adulto 💪';
  if (edadHumana < 70) return 'adulto maduro 🧡';
  return 'senior, necesita revisiones más seguido 👴';
}
