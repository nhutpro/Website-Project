const slider1 = document.getElementById("glide_1");
if (slider1) {
    new Glide(slider1, {
        type: "carousel",
        startAt: 0,
        autoplay: 5000,
        hoverpause: true,
        perView: 1,
        animationDuration: 600,
        animationTimingFunc: "linear",
    }).mount();
}
