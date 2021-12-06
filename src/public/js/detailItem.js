var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-icon-next",
    prevEl: ".swiper-icon-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 5,
  spaceBetween: 0,
  navigation: {
    nextEl: ".same-swiper-icon-next",
    prevEl: ".same-swiper-icon-prev",
  },
});
swiper3.slideTo(1);
// start solve user choose a color //
const colorLsk = document.querySelectorAll(".color-detail-item");
let availableLsk = [];
const newPrice = document.querySelector(".new-price");
const oldPrice = document.querySelector(".old-price");
function transSlide(item) {
  const slide = document.querySelector(".mySwiper2");
  const slideItemLsk = slide.querySelectorAll(".swiper-slide");
  const clickedImg = item.querySelector("img");
  let indexSlide;
  for (let slideItem of slideItemLsk) {
    const img = slideItem.querySelector("img");

    if (img.src === clickedImg.src) {
      indexSlide = slideItem.getAttribute("aria-label");
      swiper2.slideTo(parseInt(indexSlide) - 1, 100);
      break;
    }
  }
}
function getPrice(item) {
  // item mean a tag //
  /*
	newPrice.innerHTML = item.querySelector(
		".color-detail-item-price"
	).textContent;
	oldPrice.innerHTML = item.querySelector(
		".color-detail-item-price"
	).textContent;
	*/
  newPrice.innerHTML = item.getAttribute("newprice");
  oldPrice.innerHTML = item.getAttribute("oldprice");
}
function clickColor(clickedColor) {
  // item mean clicked a tag //
  const activeItem = document.querySelector(".color-detail-item.active");
  activeItem.classList.remove("active");
  clickedColor.classList.add("active");
  getPrice(clickedColor);
  transSlide(clickedColor);
}

for (let item of colorLsk) {
  if (item.getAttribute("stock") === "0") {
    item.classList.add("disabled");
  } else {
    availableLsk.push(item);
  }
}
availableLsk[0].classList.add("active");
getPrice(availableLsk[0]);
transSlide(availableLsk[0]);
for (let item of availableLsk) {
  item.addEventListener("click", (e) => {
    clickColor(e.currentTarget);
  });
}

// close solve user choose a color//

//start solve user see technical infomation //
const modalCloseHeadBtn = document.querySelector(
  ".detailItem-about .modal-title button "
);
const modalCoseFoodBtn = document.querySelector(
  ".detailItem-about .modal .modal-close-btn"
);
const modal = document.querySelector(".detailItem-about .modal-container");
const modalOpenBtn = document.querySelector(
  " .detailItem-about .technicalInfo-btn"
);
modalCloseHeadBtn.addEventListener("click", (e) => {
  modal.style.display = "none";
});
modalCoseFoodBtn.addEventListener("click", (e) => {
  modal.style.display = "none";
});
modalOpenBtn.addEventListener("click", (e) => {
  modal.style.display = "flex";
});
//end solve user see technical infomation //
//start fetch //
function addCart() {
  console.log("da vao day");
  const optionId = document.querySelector(
    ".detailItem-option .capacity-option"
  );
  var optionIdValue = optionId.getAttribute("data");
  var selectedElement = document.querySelector(".color-detail-item.active");
  var selectedColor = selectedElement.getAttribute("data");
  console.log([optionIdValue, selectedElement, selectedColor]);

  fetch("http://team-13.herokuapp.com/checkout/addcart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idOption: optionIdValue,
      color: selectedColor,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == "true") {
        opentoast("Thêm Vào Giỏ Thành Công");
      }
    })
    .catch((err) => console.log(err));
}

const addcartBtn = document.querySelector(".detailItem-option .add-button");
addcartBtn.addEventListener("click", (e) => {
  const accountclick = document.querySelector("header .account");
  fetch("http://team-13.herokuapp.com/account/login/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == "true") {
        addCart();
      } else {
        accountclick.click();
        return false;
      }
    });
});
function buyitems() {
  console.log("da vao day");
  const optionId = document.querySelector(
    ".detailItem-option .capacity-option"
  );
  var optionIdValue = optionId.getAttribute("data");
  var selectedElement = document.querySelector(".color-detail-item.active");
  var selectedColor = selectedElement.getAttribute("data");
  console.log([optionIdValue, selectedElement, selectedColor]);

  fetch("http://team-13.herokuapp.com/checkout/addcart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idOption: optionIdValue,
      color: selectedColor,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == "true") {
        window.location.href = "http://team-13.herokuapp.com/checkout";
      }
    })
    .catch((err) => console.log(err));
}
const buyItemBtn = document.querySelector(".detailItem-option .buy-button");
buyItemBtn.addEventListener("click", (e) => {
  const accountclick = document.querySelector("header .account");
  fetch("http://team-13.herokuapp.com/account/login/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == "true") {
        buyitems();
      } else {
        accountclick.click();
        return false;
      }
    });
});
console.log(addcartBtn);
//end fetch//
