const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
    name: String,
    type: String,
    price: String,
    description: String,
    image: String,
});
module.exports = mongoose.model("Item", Item);