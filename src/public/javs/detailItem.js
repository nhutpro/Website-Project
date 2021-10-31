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
  var swiper = new Swiper(".mySwiper3", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation:{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    }
  });