/*start prevent default event form*/
const Forms = document.querySelectorAll(".account-modal-container form");
const submitBtns = document.querySelectorAll(
	".account-modal-container input[type ='submit'] "
);
submitBtns.forEach((item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault();
	});
});
Forms.forEach((item) => {
	item.addEventListener("submit", (e) => {
		e.preventDefault();
	});
});
/*end preven default event form */

/*start open account form */
const loginForm = document.querySelector(".account-modal .login-form");
const signUpForm = document.querySelector(".account-modal .signUp-form");
const findAccountForm = document.querySelector(
	".account-modal .find-account-form"
);
const accountIcon = document.querySelector("header .icon.account");
const accountModal = document.querySelector(".account-modal-container");
accountIcon.addEventListener("click", (e) => {
	accountModal.style.display = "flex";
	loginForm.style.display = "block";
	signUpForm.style.display = "none";
	findAccountForm.style.display = "none";
});
/*end account form */

/*start close account form */
const accountFormCloseBtns = document.querySelectorAll(
	".account-modal-container .modal-close-btn"
);
accountFormCloseBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		accountModal.style.display = "none";
		e.currentTarget.parentNode.reset();
	});
});
/* end close account form */

/* cover password */
const coverIcon = document.querySelectorAll(
	".account-modal-container .cover-icon"
);
function showPassWord(e) {
	const clickedIcon = e.currentTarget;
	const clickedInput = clickedIcon.parentNode.querySelector("input");
	if (clickedIcon.getAttribute("class") == "fas fa-eye-slash cover-icon") {
		clickedIcon.setAttribute("class", "fas fa-eye cover-icon");
		clickedInput.setAttribute("type", "text");
	} else {
		clickedIcon.setAttribute("class", "fas fa-eye-slash cover-icon");
		clickedInput.setAttribute("type", "password");
	}
}
for (let icon of coverIcon) {
	icon.addEventListener("click", showPassWord);
}
/*cover password*/

/* start forward all form */

const forwardLoginBtns = document.querySelectorAll(
	".account-modal .forward-login"
);
const forwardSignUpBtn = document.querySelector(
	".account-modal .forward-SignUp"
);
const forwardFindAccountBtn = document.querySelector(
	".account-modal .forward-FindAccount"
);
console.log([forwardFindAccountBtn, findAccountForm]);
forwardLoginBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		currentForm = e.target.parentNode;
		currentForm.reset();
		currentForm.style.display = "none";
		loginForm.style.display = "block";
	});
});
forwardSignUpBtn.addEventListener("click", (e) => {
	currentForm = e.target.parentNode;
	currentForm.reset();
	currentForm.style.display = "none";
	signUpForm.style.display = "block";
});
forwardFindAccountBtn.addEventListener("click", (e) => {
	currentForm = e.target.parentNode;
	currentForm.reset();
	currentForm.style.display = "none";
	findAccountForm.style.display = "block";
});

/* end forward all form */

/* start click login submit button */
function sendUserInfo() {
	const loginEmail = document.getElementById("login-mail");
	const loginPassWord = document.getElementById("login-password");
	//start fetch //
	console.log("start send data");
	fetch("http://localhost:3000/account/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: `${loginEmail.value}`,
			password: `${loginPassWord.value}`,
		}),
	})
		.then((data) => data.json())
		.then((data) => {
			console.log(data);
			console.log("success");
		});
}

const loginSubmit = document.querySelector(
	".account-modal-container .login-submit"
);
loginSubmit.addEventListener("click", sendUserInfo);
/* end click login submit button */
