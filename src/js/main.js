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



// disabled scroll with open modal window


const disablesScroll=()=>{
  document.body.scrollPosition = window.scrollY
  document.body.style.cssText=`
  overlow:hidden;
  position:fixed;
  top:-${ document.body.scrollPosition}px;
   left:0;
   height:100vh;
   width:100vh;
  `
}
const enabledScroll=()=>{
  window.scroll({top: document.body.scrollPosition})
  document.body.style.cssText='';
}
// modal window
const overlayModal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close");
const openBtn = document.querySelectorAll(".modal__open-btn");

//закрытие модалки
overlayModal.addEventListener("click", ({ target }) => {
  if (target === overlayModal || target === closeBtn) {
   overlayModal.remove()
   enabledScroll()
  }
});


for (let i = 0; i < openBtn.length; i++) {
  openBtn[i].addEventListener("click", () => {
    overlayModal.classList.toggle("modal--active");
    disablesScroll()
  });
}

// открытие модалки по кнопки

//new WOW().init();
