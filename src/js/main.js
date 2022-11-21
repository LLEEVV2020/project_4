const swiper = new Swiper(".slider-container", {
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  speed: 3100,
  pagination: {
    el: ".swiper-p1",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiperbn1",
    prevEl: ".swiperbn2",
  },
});

// modal window
const overlayModal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close");
const openBtn = document.querySelectorAll('.');

//закрытие модалки
overlayModal.addEventListener("click", ({ target }) => {
  if (target === overlayModal || target.closest(".modal__close")) {
    overlayElem.remove();
  }
});

for (let i = 0; i < openBtn.length; i++) {
  openBtn[i].addEventListener("click", () => {
     overlayModal.classList.toggle('modal--active');
  });
}

// открытие модалки по кнопки

//new WOW().init();
