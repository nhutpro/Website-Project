const nodemailer = require("nodemailer");
const user = require("../models/User");
const cart = require("../models/Cart");
const address = require("../models/Address");
var recoveryCode = 9450;
var confirmCode = 1234;
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
			console.log(users);
			console.log(user.length);
			if (users.length !== 0) {
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
		console.log(confirmCode);
		console.log(req.body.code);
		console.log(req.body);
		if (req.body.code === `${confirmCode}`) {
			user
				.create({
					email: req.body.email,
					password: req.body.password,
					phone: req.body.phone,
					name: req.body.name,
				})
				.then((userItem) => {
					console.log(userItem);
					cart
						.create({
							userID: userItem._id,
							list: [],
						})
						.then((cartItem) => {
							res.send({
								status: "true",
							});
							console.log(cartItem);
						})
						.catch((err) => {
							console.log("Lỗi chỗ này");
							res.send({
								status: "false",
								message: "Lỗi database vui lòng nhập lại mã",
							});
						});
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
						else {
							req.session.user = users[0];
							req.session.save();
							console.log("user id la: ");
							res.send({
								name: `${req.session.user.name}`,
								status: "true",
							});
							console.log(req.session.user);
						}
					});
				}
			})
			.catch(next);
	}
	user(req, res, next) {
		if (typeof req.session.user == "undefined") {
			res.send({
				status: "false",
			});
		} else {
			res.send({ name: `${req.session.user.name}`, status: "true" });
		}
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
	signOut(req, res, next) {
		req.session.destroy();
	}
	userInfo(req, res, next) {
		address
			.find()
			.select("name")
			.then((data) => {
				let district = [];
				let ward = [];
				let userProvince = req.session.user.address.province;
				let userDistrict = req.session.user.address.district;
				data = data.map((item) => item.toObject());
				if (userProvince != "") {
					address.find({ name: userProvince }).then((districtData) => {
						districtData = districtData.map((item) => item.toObject());
						district = districtData[0].districts;

						let districtSelected = district.filter(
							(districtData) => districtData.name == userDistrict
						);

						ward = districtSelected[0].wards;
						res.render("userinfo", {
							user: req.session.user,
							province: data,
							district: district,
							ward: ward,
						});
					});
				} else {
					res.render("userinfo", {
						user: req.session.user,
						province: data,
						district: district,
						ward: ward,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
		/*
		res.render("userinfo", {
			user: req.session.user,
		});
		*/
	}
	update(req, res, next) {
		console.log("day la data gui len");
		console.log(req.body);
		user
			.updateOne(
				{
					_id: req.session.user._id,
				},
				{
					name: req.body.username,
					phone: req.body.phone,
					gender: req.body.gender,
					birthday: req.body.birthday,
					email: req.body.email,
					address: {
						province: req.body.province,
						district: req.body.district,
						ward: req.body.ward,
						addressdetail: req.body.addressDetail,
					},
				}
			)
			.then((data) => {
				(req.session.user.name = req.body.username),
					(req.session.user.phone = req.body.phone),
					(req.session.user.gender = req.body.gender),
					(req.session.user.birthday = req.body.birthday);
				req.session.user.email = req.body.email;
				req.session.user.address = {
					province: req.body.province,
					district: req.body.district,
					ward: req.body.ward,
					addressdetail: req.body.addressDetail,
				};
				req.session.save();
				res.send({
					status: "true",
				});
			});
	}
}
module.exports = new AccountController();
