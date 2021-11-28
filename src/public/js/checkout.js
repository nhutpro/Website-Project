const addBtns = document.querySelectorAll(".increase-item");
const subBtns = document.querySelectorAll(".decrease-item");
const removeBtns = document.querySelectorAll(".remove-item");
const inputQuantity = document.querySelectorAll(".detail__quantity input");

const sub_totalEle = document.querySelector(".sub-total dd");
const totalEle = document.querySelector(".total dd");

function updateTotals() {
  let subTotal = 0,
    prices = document.querySelectorAll(".detail__item-price"),
    nums = document.querySelectorAll(".detail__quantity input");
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

//fuction to set quantity of item
function setQuantity(id, value, input) {
  fetch("./checkout/set-quantity", {
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

function isValid(str) {
  if (!str) {
    return false;
  }
  str = str.replace(/^0+/, "") || "0";
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n > 0;
}
function updateInfo() {
  location.href("/user/info");
}
addBtns.forEach((item) => {
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.parentElement.getAttribute("id"),
      input = event.currentTarget.parentElement.querySelector("input"),
      value = parseInt(input.value);
    setQuantity(id, value + 1, input);
    input.value = value + 1;
  });
});

subBtns.forEach((item) => {
  if (item.parentElement.querySelector("input").value == 1)
    item.disabled = true;
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.parentElement.getAttribute("id"),
      input = event.currentTarget.parentElement.querySelector("input"),
      value = parseInt(input.value);
    if (value - 1 >= 1) {
      setQuantity(id, value - 1, input);
      input.value = value - 1;
    }
  });
});

inputQuantity.forEach((field) => {
  let unchagedInput;
  field.addEventListener("focus", (e) => {
    unchagedInput = e.currentTarget.value;
  });
  field.addEventListener("change", (event) => {
    let invalid_input =
        event.currentTarget.parentElement.parentElement.querySelector(
          ".invalid-input"
        ),
      input = event.currentTarget,
      item_container = input.parentElement.parentElement,
      id = item_container.getAttribute("id");
    if (isValid(field.value)) {
      unchagedInput = input.value;
      if (invalid_input) invalid_input.remove();
      setQuantity(id, input.value, input);
    } else {
      input.value = unchagedInput;
      if (!invalid_input) {
        let invalidWarning = document.createElement("p");
        invalidWarning.classList.add("invalid-input");
        invalidWarning.innerHTML = "số lượng không hợp lệ";
        item_container.append(invalidWarning);
        setTimeout(function () {
          item_container.removeChild(item_container.lastChild);
        }, 3000);
      }
    }
  });
});

// const invalid_input =

const user_info = document.querySelectorAll(".form-group input"); //disable user_info's input
user_info.forEach((user) => (user.readOnly = true)); //disable user_info's input

var delete_form = document.forms["delete-form"];
const remove_modal = document.querySelector(".remove-modal");

removeBtns.forEach((item) => {
  item.addEventListener("click", function (event) {
    let id = event.currentTarget.parentElement.getAttribute("id");

    remove_modal.style.display = "flex";
    let delelteBtn = document.querySelector(".modal__button--confirm");
    let cancelBtn = document.querySelector(".modal__button--cancel");
    delelteBtn.addEventListener("click", (e) => {
      delete_form.action = "/checkout/" + id + "?_method=DELETE";
      delete_form.submit();
    });
    cancelBtn.addEventListener("click", (e) => {
      remove_modal.style.display = "none";
    });
  });
});
