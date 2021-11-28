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
districtdefault = document.getElementById("district__default");
warddefault = document.getElementById("ward__default");
console.log([districtdefault, warddefault]);

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
	} else {
		district.disabled = false;
		fetch("http://localhost:3000/address/district/?province=" + province.value)
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
	} else {
		ward.disabled = false;
		fetch(
			`http://localhost:3000/address/district/ward?province=${province.value}&district=${district.value}`
		)
			.then((wards) => wards.json())
			.then((wards) => {
				console.log(wards);
				renderWard(wards);
			});
	}
});
