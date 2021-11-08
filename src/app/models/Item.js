const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
	name: String,
	type: String,
	image: Array,
	description: String,
	slug: String,
	techInfo: Array,
});

module.exports = mongoose.model('Item', Item);
