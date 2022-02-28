//sovle gender option//
const genderInput = document.getElementById("userinfo-gender");
var value = genderInput.getAttribute("data");
const genderOptions = genderInput.querySelectorAll("input");
genderOptions.forEach((option) => {
  if (option.value === value) {
    option.checked = true;
  }
});
//end sovle gender option

const province = document.getElementById("address__province");
const district = document.getElementById("address__district");
const ward = document.getElementById("address__ward");
const addressdetail = document.getElementById("address__detail");
districtdefault = document.getElementById("district__default");
warddefault = document.getElementById("ward__default");
console.log([districtdefault, warddefault]);

if (province.getAttribute("data") != "") {
  let userProvince = province.getAttribute("data");
  let provinceOptions = province.querySelectorAll("option");
  provinceOptions.forEach((option) => {
    if (option.value == userProvince) option.selected = true;
  });
  province.disabled = false;

  let userDistrict = district.getAttribute("data");
  let districtOptions = district.querySelectorAll("option");
  districtOptions.forEach((option) => {
    if (option.value == userDistrict) option.selected = true;
  });
  district.disabled = false;

  let userWard = ward.getAttribute("data");
  let wardOptions = ward.querySelectorAll("option");
  wardOptions.forEach((option) => {
    if (option.value == userWard) option.selected = true;
  });
  ward.disabled = false;
  addressdetail.disabled = false;

  console.log([userProvince, userDistrict, userWard]);
  console.log(provinceOptions);
  console.log(districtOptions);
  console.log(wardOptions);
}

//reder district //
function renderDistrict(arrayDistrict) {
  htmlDistrict = arrayDistrict.map((districtData) => {
    return `<option value="${districtData.name}">${districtData.name}</option>`;
  });
  district.innerHTML =
    '<option value="" id="district__default">Quận / Huyện</option>' +
    htmlDistrict.join("");
}

// ///

province.addEventListener("change", () => {
  console.log(province.value);
  if (province.value === "") {
    district.disabled = true;
    ward.disabled = true;
    addressdetail.disabled = true;
  } else {
    district.disabled = false;
    fetch("/address/district/?province=" + province.value)
      .then((districts) => districts.json())
      .then((districts) => {
        console.log(districts);
        renderDistrict(districts);
      });
  }
});
function renderWard(arrayWard) {
  htmlWard = arrayWard.map((WardtData) => {
    return `<option value="${WardtData.name}">${WardtData.name}</option>`;
  });
  ward.innerHTML =
    '<option value="" id="ward__default">Phường / Xã</option>' +
    htmlWard.join("");
}

district.addEventListener("change", () => {
  console.log([province.value, district.value]);
  if (district.value === "") {
    ward.disabled = true;
    addressdetail.disabled = true;
  } else {
    ward.disabled = false;
    fetch(
      `/address/district/ward?province=${province.value}&district=${district.value}`
    )
      .then((wards) => wards.json())
      .then((wards) => {
        console.log(wards);
        renderWard(wards);
      });
  }
});

ward.addEventListener("change", () => {
  if (ward.value === "") {
    addressdetail.disabled = true;
  } else {
    addressdetail.disabled = false;
  }
});
const addressRow = document.querySelector(".userinfo-form .row-address");
const addressError = addressRow.parentElement.querySelector(".error-message");
console.log(addressError);
console.log(addressRow);
addressRow.addEventListener("focusin", (e) => {
  addressError.innerText = "";
});
function checkAdress() {
  if (addressdetail.disabled == true || addressdetail.value == "") {
    return false;
  } else {
    return true;
  }
}

Validator({
  form: ".userinfo-form",
  errorSelector: ".error-message",
  rules: [
    Validator.isRequired("#userinfo-name"),
    Validator.isEmail("#userinfo-email"),
    Validator.isPhone("#userinfo-phone"),
  ],
  onSubmit: function (data) {
    console.log(data);
    if (checkAdress()) {
      genderOptions.forEach((option) => {
        if (option.checked == true) {
          data.gender = option.value;
        }
      });
      fetch("/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          province: province.value,
          district: district.value,
          ward: ward.value,
          addressDetail: addressdetail.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == "true") {
            opentoast("Cập nhật thông tin thành công");
            location.reload();
          }
        });
    } else {
      console.log("sai");
      addressError.innerText = "Địa chỉ không hợp lệ";
    }
  },
});
