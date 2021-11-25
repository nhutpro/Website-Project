const addBtns = document.querySelectorAll(".increase-item");
const subBtns = document.querySelectorAll(".decrease-item");
const removeBtns = document.querySelectorAll(".remove-item");

const sub_totalEle = document.querySelector(".sub-total dd");
const totalEle = document.querySelector(".total dd");

function updateTotals() {
  let subTotal = 0;
  let prices = document.querySelectorAll(".detail__item-price");
  let nums = document.querySelectorAll(".detail__quantity input");
  prices.forEach((price, index) => {
    let itemPrice = parseInt(price.innerHTML.slice(0, -7).replaceAll(".", ""));
    // console.log(nums[index]);
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

addBtns.forEach((item) => {
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.parentElement.getAttribute("id");
    let input = event.currentTarget.parentElement.querySelector("input");
    fetch("./checkout/add-items", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemID: id }),
    }).then(() => {
      input.value = parseInt(input.value) + 1;
      if (input.value > 1)
        input.parentElement.querySelector(".decrease-item").disabled = false;
      updateTotals();
    });
  });
});

subBtns.forEach((item) => {
  if (item.parentElement.querySelector("input").value == 1)
    item.disabled = true;

  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.parentElement.getAttribute("id");
    let input = event.currentTarget.parentElement.querySelector("input");
    if (input.value > 1) {
      fetch("./checkout/subtract-items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemID: id }),
      }).then(() => {
        input.value = parseInt(input.value) - 1;
        if (input.value <= 1)
          input.parentElement.querySelector(".decrease-item").disabled = true;
        updateTotals();
      });
    }
  });
});

const userInfo = document.querySelectorAll(".form-group input"); //disable userInfo's input
userInfo.forEach((user) => (user.disabled = true)); //disable userInfo's input

var deleteForm = document.forms["delete-form"];
removeBtns.forEach((item) => {
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.getAttribute("id");
    deleteForm.action = "/checkout/" + id + "?_method=DELETE";
    deleteForm.submit();
  });
});
var emptyCart = document.querySelector(".empty-cart");
if (emptyCart) {
  document.querySelector(".delivery-info").style.opacity = 0;
  document.querySelector(".cart-container").style.width = "40%";
}
