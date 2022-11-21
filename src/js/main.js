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
const openBtn = document.querySelectorAll(".add");

//закрытие модалки

for (let i = 0; i < openBtn.length; i++) {
  openBtn[i].addEventListener("click", () => {
    overlayModal.classList.add("modal--active");
  });

  overlayModal.addEventListener("click", ({ target }) => {
    if (target === overlayModal || target === closeBtn) {
      overlayModal.classList.remove("modal--active");
    }
  });
}

// открытие модалки по кнопки

//new WOW().init();
