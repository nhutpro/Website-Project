const nodemailer = require("nodemailer");
const { find } = require("../models/User");
const user = require("../models/User");
var recoveryCode = 9450;
var confirmCode;
var emailRecovery = "tnhut803@gmail.com";
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "nhutt460@gmail.com", // generated ethereal user
		pass: "Trannhut1", // generated ethereal password
	},
});
function getRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
function sendMail(desMail, Message) {
	var code = getRandom(1000, 10000);
	transporter.sendMail({
		from: "nhutt460@gmail.com", // sender address
		to: `${desMail}`, // list of receivers
		subject: "Mã Xác Thực Gmail", // Subject line
		text: `${Message} ${code}`, // plain text body
	});
	return code;
}
class AccountController {
	register(req, res, next) {
		console.log(req.body);
		user.find({ email: req.body.email }).then((users) => {
			if (users.lenth !== 0) {
				res.send({
					status: "false",
					message: "Email Đã Được Sử Dụng",
				});
			} else {
				res.send({ status: "true" });
				confirmCode = sendMail(
					req.body.email,
					"Mã Xác Thực gmail của bạn là :"
				);
				console.log(confirmCode);
			}
		});
	}

	registerConfirm(req, res, next) {
		if (req.body.code === `${confirmCode}`) {
			user
				.create({
					email: req.body.email,
					password: req.body.password,
					phone: req.body.phone,
					name: req.body.name,
					address: "",
				})
				.then((model) => {
					res.send({
						status: "true",
					});
					console.log(model);
				})
				.catch((err) => {
					res.send({
						status: "false",
						message: "Lỗi database vui lòng nhập lại mã",
					});
				});
		} else {
			res.send({
				status: "false",
				message: "Mã Xác Minh Không Chính Xác",
			});
		}
	}
	login(req, res, next) {
		const loginInfo = req.body;
		let email = loginInfo.email;
		let password = loginInfo.password;
		console.log([email, password]);
		user
			.find({ email: email })
			.then((users) => {
				console.log(users);
				if (users.length === 0) {
					res.send({
						status: "false",
						err: "email",
						message: "Email Không Tồn Tại Vui Lòng Đăng Kí Tài Khoản",
					});
				} else {
					user.find({ email: email, password: password }).then((users) => {
						if (users.length === 0)
							res.send({
								status: "false",
								err: "password",
								message: "Mật Khẩu Không Chính Xác",
							});
						else
							res.send({
								status: "true",
							});
					});
				}
			})
			.catch(next);
	}
	user(req, res, next) {
		if (typeof req.session.user == "undefined") console.log("ok r bro");
		else console.log("nguvkl");
		console.log(req.session.user);
	}
	recovery(req, res, next) {
		recoveryCode = sendMail(req.body.email, "Mã Khôi Phục Của Bạn Là: ");
		console.log(recoveryCode);
		res.send(false);
	}
	recoveryConfirm(req, res, next) {
		console.log([req.body.email, recoveryCode]);
		console.log(req.body);
		if (req.body.code == recoveryCode) {
			emailRecovery = req.body.email;
			res.send({
				status: "true",
			});
		} else {
			res.send({
				status: "false",
				message: "Mã Xác Minh Không Chính Xác",
			});
		}
	}
	recoveryUpdate(req, res, next) {
		user
			.updateMany(
				{
					email: `${emailRecovery}`,
				},
				{
					password: `${req.body.password}`,
				}
			)
			.then((data) => {
				res.send({
					status: "true",
				});
			})
			.catch((err) => {
				res.send({
					status: "false",
				});
			});
	}
}
module.exports = new AccountController();
