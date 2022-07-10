$(window).on('load', function () {
    $('#preloader .loader').delay(1500).fadeOut('slow');
    $('#preloader').delay(1500).fadeOut('slow'); 
    $('body').delay(2000).css({'overflow': 'visible'});
})