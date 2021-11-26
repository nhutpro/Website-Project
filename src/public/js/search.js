var searchProduct = document.getElementById('searchBox')
var countProduct = document.querySelectorAll('div[id=countProduct]')
var count = document.getElementById('count')
var key = ""
searchProduct.onchange = () => {
    console.log(searchProduct.value)
    window.history.pushState({}, "", "http://localhost:3000/search/global?key=" + searchProduct.value);
    key = searchProduct.value
    window.location.reload();

}

window.onload = () => {
    console.log(countProduct.length);
    count.innerHTML = countProduct.length
};