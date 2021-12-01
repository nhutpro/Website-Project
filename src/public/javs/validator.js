function Validator(options) {
	var formElement = document.querySelector(options.form); //Lấy form cần thực thi
	var selectorRules = {};
	function validate(inputElement, rule) {
		console.log("vao day roi");
		var errorMessage;

		var formRow = inputElement.parentElement;
		var errorElement = inputElement.parentElement.parentElement.querySelector(
			options.errorSelector
		);

		var rules = selectorRules[rule.selector];
		for (var i = 0; i < rules.length; ++i) {
			errorMessage = rules[i](inputElement.value);
			if (errorMessage) break;
		}
		if (errorMessage) {
			formRow.classList.add("invalid");
			errorElement.innerText = errorMessage;
		} else {
			formRow.classList.remove("invalid");
			errorElement.innerText = "";
		}
		return !errorMessage;
	}

	if (formElement) {
		//submit form//
		formElement.onsubmit = function (e) {
			e.preventDefault();
			var formValid = true;

			options.rules.forEach(function (rule) {
				var inputElement = formElement.querySelector(rule.selector);
				var isValid = validate(inputElement, rule);
				if (!isValid) {
					formValid = false;
				}
			});
			if (formValid) {
				if (typeof options.onSubmit === "function") {
					var enableInputs = formElement.querySelectorAll("[name]");

					enableInputs = Array.from(enableInputs).filter((input, index) => {
						return input.value != "";
					});
					var formValues = enableInputs.reduce(function (values, input) {
						return { ...values, [input.name]: input.value };
					}, {});
					options.onSubmit(formValues);
				}
			} else {
				console.log("Form chưa hợp lệ");
			}
		};

		//loop on rule and solve event input//
		options.rules.forEach(function (rule) {
			var inputElement = formElement.querySelector(rule.selector);
			if (Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector].push(rule.test);
			} else {
				selectorRules[rule.selector] = [rule.test];
			}
			if (inputElement) {
				//Xử lí sự kiện blur của input//
				inputElement.onblur = function () {
					validate(inputElement, rule);
				};
				//Xử lí sự kiện nhập vào  của input//
				inputElement.oninput = function () {
					var formRow = inputElement.parentElement;
					var errorElement =
						inputElement.parentElement.parentElement.querySelector(
							options.errorSelector
						);
					formRow.classList.remove("invalid");
					errorElement.innerText = "";
				};
			}
		});
	}
}
Validator.isRequired = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			return value.trim() ? undefined : "Vui Lòng Nhập Trường Này";
		},
	};
};
Validator.isEmail = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : "Trường này phải là email";
		},
	};
};
Validator.isMinLength = function (selector, minLength) {
	return {
		selector: selector,
		test: function (value) {
			return value.length >= minLength
				? undefined
				: "Mật Khẩu phải có ít nhất 6 kí tự";
		},
	};
};
Validator.isPhone = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			var regex = /^0\d{9}$/;
			return regex.test(value) ? undefined : "Số điện thoại không đúng";
		},
	};
};
Validator.isConfirm = function (selector, password) {
	return {
		selector: selector,
		test: function (value) {
			return value === password() ? undefined : "Không khớp với mật khẩu";
		},
	};
};
