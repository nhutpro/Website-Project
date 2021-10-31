AOS.init({
  offset: 50, //trigger offset in px
  duration: 350, // values from 0 to 3000, with step 50ms
  easing: 'ease-in-back', // default easing for AOS animations
  once: true,
});
const slider1 = document.getElementById('glide_1');
if (slider1) {
  new Glide(slider1, {
    focusAt: 'center',
    type: 'carousel',
    startAt: 0,
    autoplay: 5000,
    hoverpause: true,
    perView: 1,
    animationDuration: 500,
    animationTimingFunc: 'linear',
  }).mount();
}
const slider2 = document.getElementById('glide_2');
if (slider2) {
  new Glide(slider2, {
    focusAt: 'center',
    type: 'carousel',
    startAt: 0,
    perView: 1,
    animationDuration: 500,
    animationTimingFunc: 'linear',
  }).mount();
}
