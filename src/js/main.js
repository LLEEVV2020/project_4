const swiper = new Swiper('.slider-container',{
 autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-p1",
  },
  navigation: {
    nextEl: ".swiperbn1",
    prevEl: ".swiperbn2",
  },
});


