const swiper = new Swiper('.slider-container',{
 autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 1000,
  pagination: {
    el: ".swiper-p1",
    clickable: true
  },
  navigation: {
    nextEl: ".swiperbn1",
    prevEl: ".swiperbn2",
  },
});


new WOW().init();
