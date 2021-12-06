const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
	{
		email: { type: String, default: "" },
		password: { type: String, default: "" },
		phone: { type: String, default: "" },
		gender: { type: String, default: "Nam" },
		birthday: { type: String, default: "2001-02-19" },
		name: { type: String, default: "" },
		address: {
			type: Object,
			default: {
				province: "",
				district: "",
				ward: "",
				addressdetail: "",
			},
		},
	},
	{ collection: "users" }
);
module.exports = mongoose.model("user", user);
