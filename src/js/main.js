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
  slidesPerView: 2,
spaceBetween: 30,
  grid: {
    rows: 3,
  },
  //spaceBetween: 0,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiperbn1",
    prevEl: ".swiperbn2",
  }
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
    document.documentElement.style.scrollBehavior = "unset";
  },
  enabledScroll() {
    document.body.style.cssText = "";
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = "";
  },
};

const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  if (modalElem !== null) {
    modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;
  }

  const closeModal = (event) => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === "Escape"
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = "hidden";
        scrollController.enabledScroll();
      }, time);

      window.removeEventListener("keydown", closeModal);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
  if (modalElem !== null) {
    modalElem.addEventListener("click", closeModal);
  }
};

modalController({
  modal: ".modal",
  btnOpen: ".modal__open-btn",
  btnClose: ".modal__close",
});
/*
Скрипт*/
const filterBox = document.querySelectorAll(".box");
const navBlock = document.querySelector(".swiper-wrapper");
//console.log(navBlock);
navBlock.addEventListener("click", (event) => {
  if (event.target.className !== "swiper-slide__img") return false;
  let filterClass = event.target.dataset["f"];
  //console.log(filterClass);
  filterBox.forEach((elem) => {
    let item_img = elem.querySelector("img");
    if (item_img !== null) {
      item_img.parentNode.removeChild(item_img);
    }
    const $img = document.createElement("img");
    $img.src = elem.dataset["background_image"];
    elem.appendChild($img);
    let backgroundImage = elem.dataset["background_image"];
    //console.log(backgroundImage);
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
// все теги a в нашем меню
const elemMenu = document.querySelectorAll('.header__list-link');

burgerBtn.addEventListener("click", ({ target }) => {
  overtlayMenu.classList.toggle("header-top__inner--active");
})


// ВОТ ПЕРЕБИРАЮ ВСЕ ТЕГИ A, ЧТОБ ПОВЕСИТЬ ОБРАБОТЧИК.
// elemMenu.forEach((item)=>{
//   item.addEventListener('click',()=>{
//     overtlayMenu.classList.remove("header-top__inner--active");
//   })


//   })

// email
// телефон заполнить полностью
let phoneText = false;
// емайл заполнить полностью
let emailText = false;

var h_form_btn = document.querySelectorAll(".btn-send");

h_form_btn.forEach(function (item) {
  formReadyClick(item);
});

function formReadyClick(btn) {
  let form = btn.closest("form");

  form.addEventListener("submit", formSendAsync2, { once: false });

  async function formSendAsync2(e) {
    e.preventDefault(); // запрет на отправку стандартной формы

    formSendAsync(btn);
  }
}

async function formSendAsync(btn_child) {
  let form = btn_child.closest("form");

  let error = formValidate(form);

  let formData = new FormData(form);

  if (error === 0) {
    form.classList.add("_sending");
    let response = await fetch("../callback-request/index.php", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      let result = await response.json();

      form.reset();
      form.classList.remove("_sending");

      return true;
    } else {
      alert("ошибка");
    }
  } else {
    if (phoneText) {
      alert("Введите ещё цифры телефона");
    } else if (emailText) {
      alert("Введите емайл полностью");
    } else {
      alert("заполните поля");
    }
  }
  return false;
}

// проверка на ошибки
function formValidate(form) {
  let error = 0;

  let formReq = form.getElementsByClassName("_req");

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    formRemoveError(input); // убрать класс проверки

    if (input.classList.contains("_email")) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains("input__mask")) {
      if (phoneTest(input)) {
        formAddError(input);
        error++;
        phoneText = true;
      }
    } else if (
      input.getAttribute("type") === "checkbox" &&
      input.checked === false
    ) {
      formAddError(input);
      error++;
    } else {
      if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
  }
  return error;
}
// добавляют родители и элементу класс _error
function formAddError(input) {
  input.parentElement.classList.add("_error");
  input.classList.add("_error");
}
function formRemoveError(input) {
  input.parentElement.classList.remove("_error");
  input.classList.remove("_error");
}

// проверка emai
function emailTest(input) {
  emailText = true;
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// проверка телефона
function phoneTest(input) {
  if (
    input.value.replace(/ +/g, " ").trim() === "+7" ||
    input.value === "" ||
    input.value.replace(/[\+\(\)\s]/g, "").length < 10
  ) {
    return true;
  }

  return false;
}

const formImage = document.getElementById("quiz__file");
const formPreview = document.querySelector(".input__file-button-text");

if (formImage) {
  formImage.addEventListener("change", () => {
    uploadFile(formImage.files[0]);
  });
}

function uploadFile(file) {
  if (file.size > 4 * 1024 * 1024) {
    alert("файл должен быть менее 4мб");
    return;
  }

  var reader = new FileReader();

  reader.onload = function (e) {
    formPreview.innerHTML = `<span style="color: #f28d55;">Файл добавлен</span>`;
  };
  reader.onerror = function (e) {
    alert("Ошибка");
  };
  reader.readAsDataURL(file);
}

// якоря
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}


//авто подсказка

const processHide = document.querySelector('.process__item-hide');
const closeHide = document.querySelectorAll('.process__item-hide__btn')

const cardsList = document.querySelector('.process-items');



if( cardsList !== null){
  cardsList.addEventListener('click', ({target}) => {
    const modals = cardsList.querySelectorAll('.process__item-hide');
    if (target.closest('.process-items__item')) {
      modals.forEach(modal => {
          modal.classList.remove('open');
        })
      const card = target.closest('.process-items__item');
      const modal = card.querySelector('.process__item-hide');
      modal.classList.add('open');
    }

    if (!target.closest('.process-items__item')) {
        modals.forEach(modal => {
          modal.classList.remove('open');
        })
    }
  });

}


