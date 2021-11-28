var brandidCheckboxes = document.getElementsByName("Brandids[]");
var checkBoxAll = document.getElementById("checkAllBrand");
var priceidCheckboxes = document.getElementsByName("Priceids[]");
var checkBoxAllPrice = document.getElementById("checkAllPrice");
var sortAsc = document.getElementById('sort-asc-phone')
var sortDesc = document.getElementById('sort-desc-phone')


// check all brand
checkBoxAll.onclick = function () {

  localStorage.setItem("queryParamsBrand", "apple,samsung,vsmart,oppo,xiaomi,realme,");
  history.pushState({}, "", "?brand=" + localStorage.getItem("queryParamsBrand") + "&price=" + localStorage.getItem("queryParamsPrice"));

  //window.history.pushState({}, "", "http://localhost:3000/phone");

  window.location.reload();
};

// check one or multi brand
var queryParamsBrand = "";
for (var checkbox of brandidCheckboxes) {
  checkbox.onclick = function () {
    queryParamsBrand = localStorage.getItem("queryParamsBrand"); // perist after reload for check multi value
    if (queryParamsBrand.search(this.value) >= 0) {
      var temp = this.value + ",";
      queryParamsBrand = queryParamsBrand.replace(temp, ""); // when uncheck, delete QueryParams
    } else {
      queryParamsBrand = queryParamsBrand + this.value + ","; // when check, add queryParams
    }
    localStorage.setItem("queryParamsBrand", queryParamsBrand);
    if (queryParamsBrand == "") {
      queryParamsBrand = ",.,"
      localStorage.setItem("queryParamsBrand", queryParamsBrand);
    }

    //history.pushState({}, "", "?brand=" + queryParamsBrand);
    history.pushState({}, "", "?brand=" + queryParamsBrand + "&price=" + localStorage.getItem("queryParamsPrice"));

    window.location.reload();
  };
}

var countChecked = 0; // count brand checked
// if brand is checked, set brand checked by queryparams
for (var checkbox of brandidCheckboxes) {
  var isExist = localStorage.getItem("queryParamsBrand").search(checkbox.value) >= 0;
  checkbox.checked = isExist;
  if (isExist) {
    checkbox.checked = true;
    ++countChecked;
  } else {
    checkbox.checked = false;
    checkBoxAll.checked = false;
  }
}
if (countChecked == 6) {
  checkBoxAll.checked = true;
}
if (document.referrer == "http://localhost:3000/phone") {
  checkBoxAll.checked = true;
  for (var checkbox of brandidCheckboxes) {
    checkbox.checked = true;
  }
}

// set up for checkbox price

// check all brand
checkBoxAllPrice.onclick = function () {
  //window.history.pushState({}, "", "http://localhost:3000/phone");

  //localStorage.setItem("queryParamsPrice", "");
  localStorage.setItem("queryParamsPrice", "duoi-2-trieu,tu-2-5-trieu,tu-5-14-trieu,tren-14-trieu,");
  history.pushState({}, "", "?brand=" + localStorage.getItem("queryParamsBrand") + "&price=" + localStorage.getItem("queryParamsPrice"));

  window.location.reload();
};


// check one or multi price
var queryParamsPrice = "";
for (var checkbox of priceidCheckboxes) {
  checkbox.onclick = function () {
    queryParamsPrice = localStorage.getItem("queryParamsPrice"); // perist after reload for check multi value
    if (queryParamsPrice.search(this.value) >= 0) {
      var temp = this.value + ",";
      queryParamsPrice = queryParamsPrice.replace(temp, ""); // when uncheck, delete QueryParams
    } else {
      queryParamsPrice = queryParamsPrice + this.value + ","; // when check, add queryParams
    }
    localStorage.setItem("queryParamsPrice", queryParamsPrice);
    if (queryParamsPrice == "") {
      queryParamsPrice = ",.,"
      localStorage.setItem("queryParamsPrice", queryParamsPrice);
    }

    history.pushState({}, "", "?brand=" + localStorage.getItem("queryParamsBrand") + "&price=" + queryParamsPrice);
    localStorage.setItem("paramPrice", queryParamsPrice)
    window.location.reload();
  };
}

var countCheckedPrice = 0; // count price checked
// if price is checked, set price checked by queryparams
for (var checkbox of priceidCheckboxes) {
  var isExist = localStorage.getItem("queryParamsPrice").search(checkbox.value) >= 0;
  checkbox.checked = isExist;
  if (isExist) {
    checkbox.checked = true;
    ++countCheckedPrice;
  } else {
    checkbox.checked = false;
    //checkBoxAll.checked = false;
  }
}

if (countCheckedPrice == 4) {
  checkBoxAllPrice.checked = true;
}
if (document.referrer == "http://localhost:3000/phone") {
  checkBoxAllPrice.checked = true;
  for (var checkbox of priceidCheckboxes) {
    checkbox.checked = true;
  }
}

sortAsc.onclick = () => {

  if (localStorage.getItem(queryParamsPrice) != "" || localStorage.getItem(queryParamsBrand) != "") {
    window.history.pushState({}, "", "?brand=" + localStorage.getItem("queryParamsBrand") + "&price=" + localStorage.getItem("queryParamsPrice") + "&sort=asc");
    window.location.reload();

  }
  else {
    window.history.pushState({}, "", "http://localhost:3000/phone?sort=asc");
    window.location.reload();
  }
}
sortDesc.onclick = () => {
  if (localStorage.getItem(queryParamsPrice) != "" || localStorage.getItem(queryParamsBrand) != "") {
    window.history.pushState({}, "", "?brand=" + localStorage.getItem("queryParamsBrand") + "&price=" + localStorage.getItem("queryParamsPrice") + "&sort=desc");
    window.location.reload();
  }
  else {
    window.history.pushState({}, "", "http://localhost:3000/phone?sort=desc");
    window.location.reload();
  }
}
