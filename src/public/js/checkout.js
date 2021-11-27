const addBtns = document.querySelectorAll(".increase-item");
const subBtns = document.querySelectorAll(".decrease-item");
const removeBtns = document.querySelectorAll(".remove-item");
const inputQuantity = document.querySelectorAll(".detail__quantity input");

const sub_totalEle = document.querySelector(".sub-total dd");
const totalEle = document.querySelector(".total dd");

function updateTotals() {
  let subTotal = 0;
  let prices = document.querySelectorAll(".detail__item-price");
  let nums = document.querySelectorAll(".detail__quantity input");
  prices.forEach((price, index) => {
    let itemPrice = parseInt(price.innerHTML.slice(0, -7).replaceAll(".", ""));
    subTotal += itemPrice * parseInt(nums[index].value);
  });
  let total = subTotal + 30000;
  subTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(subTotal);
  sub_totalEle.innerHTML = subTotal;
  total = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total);
  totalEle.innerHTML = total;
}

function setQuantity(id, value, input) {
  //fuction to set quantity of item
  fetch("./checkout/set-items", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemID: id, value: value }),
  }).then(() => {
    if (value == 1)
      input.parentElement.querySelector(".decrease-item").disabled = true;
    else input.parentElement.querySelector(".decrease-item").disabled = false;
    updateTotals();
  });
}

addBtns.forEach((item) => {
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.parentElement.getAttribute("id");
    let input = event.currentTarget.parentElement.querySelector("input");
    let value = parseInt(input.value);
    setQuantity(id, value + 1, input);
    input.value = value + 1;
  });
});

subBtns.forEach((item) => {
  if (item.parentElement.querySelector("input").value == 1)
    item.disabled = true;
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.parentElement.getAttribute("id");
    let input = event.currentTarget.parentElement.querySelector("input");
    let value = parseInt(input.value);
    if (value - 1 >= 1) {
      setQuantity(id, value - 1, input);
      input.value = value - 1;
    }
  });
});

inputQuantity.forEach((item) => {
  item.addEventListener("change", (event) => {
    let input = event.currentTarget;
    let id = event.currentTarget.parentElement.parentElement.getAttribute("id");
    if (input.value >= 1) setQuantity(id, input.value, input);
  });
});

const userInfo = document.querySelectorAll(".form-group input"); //disable userInfo's input
userInfo.forEach((user) => (user.readOnly = true)); //disable userInfo's input

var deleteForm = document.forms["delete-form"];
removeBtns.forEach((item) => {
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.getAttribute("id");
    deleteForm.action = "/checkout/" + id + "?_method=DELETE";
    deleteForm.submit();
  });
});
