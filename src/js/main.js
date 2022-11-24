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
const openBtn = document.querySelectorAll(".modal__open-btn");

// блокирует scroll при открытие modal

openBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Для каждой вешаем обработчик событий на клик
    e.preventDefault(); // Предотвращаем дефолтное поведение браузера
    overlayModal.classList.add("modal--active");
  });
});

if(overlayModal !== null){
  overlayModal.addEventListener("click", ({ target }) => {
    if (target === overlayModal || target === closeBtn) {
      overlayModal.remove();
    }
  });
}

