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

// блокирует scroll при открытие modal
const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({top: scrollController.scrollPosition})
    document.documentElement.style.scrollBehavior = '';
  },
}


const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {

      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        scrollController.enabledScroll();
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.modal',
  btnOpen: '.modal__open-btn',
  btnClose: '.modal__close',
});
/*
Скрипт*/
const filterBox = document.querySelectorAll(".box");
const navBlock = document.querySelector(".swiper-wrapper");
console.log(navBlock);
navBlock.addEventListener("click", (event) => {
  if (event.target.className !== "swiper-slide__img") return false;
  let filterClass = event.target.dataset["f"];
  console.log(filterClass);
  filterBox.forEach((elem) => {
    let item_img = elem.querySelector("img");
    if (item_img !== null) {
      item_img.parentNode.removeChild(item_img);
    }
    const $img = document.createElement("img");
    $img.src = elem.dataset["background_image"];
    elem.appendChild($img);
    let backgroundImage = elem.dataset["background_image"];
    console.log(backgroundImage);
    elem.style.backgroundImage = backgroundImage;
    elem.classList.remove("hide");
    if (!elem.classList.contains(filterClass) && filterClass !== "all") {
      elem.classList.add("hide");
    }
  });
});

//burger

const burgerBtn = document.querySelector(".header__menu-btn");
const overtlayMenu = document.querySelector(".header-top__inner");
burgerBtn.addEventListener("click", ({target}) => {
  overtlayMenu.classList.toggle("header-top__inner--active");

});
