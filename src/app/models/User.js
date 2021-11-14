const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
	name: String,
	email: String,
	phone: String,
	address: String,
	password: String,
});
module.exports = mongoose.model("User", User);
