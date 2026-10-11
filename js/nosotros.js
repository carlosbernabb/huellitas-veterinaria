/* ===========================================================
   nosotros.js
   Testimonios con bxSlider y tarjetas del equipo
   =========================================================== */

$(function () {

  // Plugin bxSlider en modo horizontal para los testimonios
  $('.slider-testimonios').bxSlider({
    auto: true,
    pause: 4500,
    controls: false,
    pager: true,
    adaptiveHeight: true,
    touchEnabled: false
  });

  // La descripción de cada médico se oculta al cargar
  $('.mas-info').hide();

  // Al dar clic en una tarjeta se muestra su descripción
  $('.equipo .tarjeta').css('cursor', 'pointer').on('click', function () {
    $(this).find('.mas-info').stop(true, true).slideToggle(300);
  });
});
