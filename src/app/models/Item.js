const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
    name: String,
    type: String,
    price: Object,
    brand: String,
    configuration: Object,

    description: String,
    image: String,
});
module.exports = mongoose.model("Item", Item);