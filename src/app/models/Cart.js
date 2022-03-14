const mongoose = require("mongoose");
const user = require("../models/User");
const option = require("../models/Option");
const Schema = mongoose.Schema;
const Cart = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    list: [
      {
        optionID: {
          type: Schema.Types.ObjectId,
          ref: "Option",
        },
        num: Number,
        color: String,
      },
    ],
  },
  { collection: "carts" }
);
module.exports = mongoose.model("Cart", Cart);
