const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Address = new Schema(
  {
    code: Number,
    name: String,
    codename: String,
    division_type: String,
    districts: Array,
    phone_code: Number,
  },
  { collection: "address" }
);
module.exports = mongoose.model("Address", Address);
