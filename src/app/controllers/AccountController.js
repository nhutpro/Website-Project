const nodemailer = require("nodemailer");
const users = require("../models/User");
class AccountController {
	login(req, res, next) {
		const loginInfo = req.body;
		let email = loginInfo.email;
		let password = loginInfo.password;
		console.log([email, password]);
		users
			.find({ email: email, password: password })
			.then((users) => {
				if (users.length !== 1) {
					res.send({
						login: false,
						user: "",
					});
				} else {
					res.send({
						login: true,
						user: users[0],
					});
					req.session.user = users[0];
				}
				console.log(users[0]);
				console.log(users.length);
			})
			.catch(next);
	}
	user(req, res, next) {
		if (typeof req.session.user == "undefined") console.log("ok r bro");
		else console.log("nguvkl");
		console.log(req.session.user);
	}
	recovery(req, res, next) {
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "nhutt460@gmail.com", // generated ethereal user
				pass: "Trannhut1", // generated ethereal password
			},
		});
		let info = transporter.sendMail({
			from: "nhutt460@gmail.com", // sender address
			to: "tnhut803@gmail.com", // list of receivers
			subject: "Khôi Phục Tài Khoản", // Subject line
			text: "Mã thay đổi mật khẩu của bạn là 2345", // plain text body
		});
		res.send("Nhutpro");
	}
}
module.exports = new AccountController();
