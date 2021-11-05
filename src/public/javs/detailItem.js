var swiper = new Swiper('.mySwiper', {
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
});
var swiper2 = new Swiper('.mySwiper2', {
	spaceBetween: 20,
	navigation: {
		nextEl: '.swiper-icon-next',
		prevEl: '.swiper-icon-prev',
	},
	thumbs: {
		swiper: swiper,
	},
});

var swiper = new Swiper('.mySwiper3', {
	slidesPerView: 4,
	spaceBetween: 20,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

// start solve user choose a color //
const colorLsk = document.querySelectorAll('.color-detail-item');
let availableLsk = [];
const newPrice = document.querySelector('.new-price');
const oldPrice = document.querySelector('.old-price');
function transSlide(item) {
	const slide = document.querySelector('.mySwiper2');
	const slideItemLsk = slide.querySelectorAll('.swiper-slide');
	const clickedImg = item.querySelector('img');
	let indexSlide;
	for (let slideItem of slideItemLsk) {
		const img = slideItem.querySelector('img');

		if (img.src === clickedImg.src) {
			indexSlide = slideItem.getAttribute('aria-label');
			swiper2.slideTo(parseInt(indexSlide) - 1, 100);
			break;
		}
	}
}
function getPrice(item) {
	// item mean a tag //
	newPrice.innerHTML = item.querySelector(
		'.color-detail-item-price'
	).textContent;
	oldPrice.innerHTML = item.querySelector(
		'.color-detail-item-price'
	).textContent;
}
function clickColor(clickedColor) {
	// item mean clicked a tag //
	const activeItem = document.querySelector('.color-detail-item.active');
	activeItem.classList.remove('active');
	clickedColor.classList.add('active');
	getPrice(clickedColor);
	transSlide(clickedColor);
}
console.log(colorLsk);
for (let item of colorLsk) {
	if (item.getAttribute('stock') === '0') {
		item.classList.add('disabled');
	} else {
		availableLsk.push(item);
	}
}
availableLsk[0].classList.add('active');
getPrice(availableLsk[0]);
transSlide(availableLsk[0]);
for (let item of availableLsk) {
	item.addEventListener('click', (e) => {
		clickColor(e.currentTarget);
	});
}

// close solve user choose a color//

//start solve user see technical infomation //
const modalCloseIcon = document.querySelector(
	'.detailItem-sub .modal-title button '
);

const modal = document.querySelector('.detailItem-sub .modal-container');
const modalOpenBtn = document.querySelector(
	' .detailItem-sub .technicalInfo-btn'
);
modalCloseIcon.addEventListener('click', (e) => {
	modal.display = 'none';
});
modalOpenBtn.addEventListener('click', (e) => {
	modal.classList.add('open');
});
//end solve user see technical infomation //
