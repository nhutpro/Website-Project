var phone = document.getElementById("phone")
var laptop = document.getElementById("laptop")
var tablet = document.getElementById("tablet")
var accessory = document.getElementById("accessory")

phone.onclick = () => {
    localStorage.setItem(
        "queryParamsBrand",
        "apple,samsung,asus,oppo,xiaomi,realme,"
    );
    localStorage.setItem(
        "queryParamsPrice",
        "duoi-2-trieu,tu-2-5-trieu,tu-5-14-trieu,tren-14-trieu,"
    );
    setPagination();
}
laptop.onclick = () => {
    localStorage.setItem(
        "queryParamsBrand",
        "acer,apple,hp,"
    );
    localStorage.setItem(
        "queryParamsPrice",
        "duoi-2-trieu,tu-2-5-trieu,tu-5-14-trieu,tren-14-trieu,"
    );
    setPagination();

}
tablet.onclick = () => {
    localStorage.setItem(
        "queryParamsBrand",
        "apple,samsung,xiaomi,"
    );
    localStorage.setItem(
        "queryParamsPrice",
        "duoi-2-trieu,tu-2-5-trieu,tu-5-14-trieu,tren-14-trieu,"
    );
    setPagination();

}
accessory.onclick = () => {
    localStorage.setItem(
        "queryParamsBrand",
        "jbl,remax,"
    );
    localStorage.setItem(
        "queryParamsPrice",
        "duoi-2-tram,tu-2-5-tram,tu-5-1-trieu,tren-1-trieu,"
    );
    setPagination();

}
setPagination = () => {
    localStorage.setItem("page1", true);
    localStorage.setItem("page2", false);
    localStorage.setItem("page3", false);
    localStorage.setItem("page4", false);
    localStorage.setItem("pageLast", false);
}
