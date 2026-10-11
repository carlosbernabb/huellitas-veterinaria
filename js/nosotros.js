$(function () {

  // Testimonios
  $('.slider-testimonios').bxSlider({
    auto: true,
    pause: 4500,
    controls: false,
    adaptiveHeight: true,
    touchEnabled: false
  });

  // Descripción de cada médico
  $('.mas-info').hide();

  $('.equipo .tarjeta').on('click', function () {
    $(this).find('.mas-info').slideToggle();
  });
});
