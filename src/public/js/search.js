var searchProduct = document.getElementById('searchBox')
var countProduct = document.querySelectorAll('div[id=countProduct]')
var count = document.getElementById('count')
var key = document.getElementById('key')
var sortAsc = document.getElementById('sort-asc')
var sortDesc = document.getElementById('sort-desc')

searchProduct.onchange = () => {

    localStorage.setItem("count", searchProduct.value)
    console.log(searchProduct.value)
    window.history.pushState({}, "", "http://localhost:3000/search/global?key=" + searchProduct.value);

    window.location.reload();

}

window.onload = () => {

    count.innerHTML = countProduct.length
    key.innerHTML = "'" + localStorage.getItem("count") + "'"
    // sort price
    sortAsc.onclick = () => {
        window.history.pushState({}, "", "http://localhost:3000/search/global?key=" + localStorage.getItem("count") + "&sort=asc");
        window.location.reload();
    }
    sortDesc.onclick = () => {
        window.history.pushState({}, "", "http://localhost:3000/search/global?key=" + localStorage.getItem("count") + "&sort=desc");
        window.location.reload();
    }
};

