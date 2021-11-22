const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: String, default: "" },
    name: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { collection: "users" }
);
module.exports = mongoose.model("user", user);
