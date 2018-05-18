$( document ).ready(function() {
  "use strict";

  // **********************************************************************//
  // Grid Masonry
  // **********************************************************************//
  $('.grid').masonry({
    itemSelector: '.grid-item'
  });

  // **********************************************************************//
  // Fixed Header
  // **********************************************************************//
  var header = $('header');
  if ($(window).scrollTop() > 60) {
    header.addClass("fixed")
  } else {
    header.removeClass("fixed")
  }
  $(window).on( 'scroll', function(){
    var sc = $(window).scrollTop()
    if (sc > 60) {
      header.addClass("fixed")
    } else {
      header.removeClass("fixed")
    }
  });


  // **********************************************************************//
  // Scroll Functions
  // **********************************************************************//
  function bodyScrollAnimation() {
    var scrollAnimate = $('body').data('scroll-animation');
    if (scrollAnimate === true) {
      new WOW({
        mobile: false
      }).init()
    }
  }

  $('.nav-menu a[href^="#"]:not([href="#"])').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top - 70
      }, 1500);
      event.preventDefault();
  });

  // **********************************************************************//
  // Mobile Button
  // **********************************************************************//
  var menu = $('.header-block');
  $('.mobile-btn').on('click', function(){
    menu.toggle("slow");
    $(this).toggleClass('active');
  });

  $('.list-inline-item.top-sub-menu').on('click', function(){
    $(this).children('.sub-menu').toggleClass('active');
    $(this).toggleClass('active');
  });

  // $(window).resize(function(){location.reload();});

})
