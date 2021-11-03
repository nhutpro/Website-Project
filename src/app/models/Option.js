const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Option = new Schema({
    slug: String,
    detail: String,
    color: Array,
}, { collection: 'options' });
module.exports = mongoose.model('Option', Option);