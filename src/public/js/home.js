const slider1 = document.getElementById("glide_1");
if (slider1) {
    new Glide(slider1, {
        focusAt: "center",
        type: "carousel",
        startAt: 0,
        autoplay: 5000,
        hoverpause: true,
        perView: 1,
        animationDuration: 500,
        animationTimingFunc: "linear",
    }).mount();
}
const slider2 = document.getElementById("glide_2");
if (slider2) {
    new Glide(slider2, {
        focusAt: "center",
        type: "carousel",
        startAt: 0,
        perView: 1,
        animationDuration: 500,
        animationTimingFunc: "linear",
    }).mount();
}
