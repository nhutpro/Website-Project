const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
    name: String,
    type: String,
    image: String,
    price: String,
    description: String,
});
module.exports = mongoose.model("Item", Item);
