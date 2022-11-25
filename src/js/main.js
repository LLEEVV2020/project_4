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











let swiper3 = new Swiper(".mySwiper", {
  slidesPerView: 3,
  grid: {
    rows: 2,
  },
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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



/*
Скрипт
const filterBox = document.querySelectorAll('.box');

document.querySelector('.nav-block').addEventListener(
    'click', event => {


        if(event.target.tagName !== 'LI') return false;

        let filterClass = event.target.dataset['f'];


        console.log(filterClass);
        filterBox.forEach( elem => {

            let backgroundImage = elem.dataset['background_image'];
            console.log(backgroundImage);

            elem.style.backgroundImage = backgroundImage;

            elem.classList.remove('hide');
            if(!elem.classList.contains(filterClass) && filterClass !== 'all'){
                elem.classList.add('hide');
            }

        });


});
*/
