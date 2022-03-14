const mongoose = require("mongoose");
const user = require("./User");
const option = require("./Option");

const Schema = mongoose.Schema;
const Purchase = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    list: [
      {
        optionID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Option",
        },
        num: Number,
        color: String,
      },
    ],
    status: String,
    date: Date,
  },
  { collection: "purchases" }
);
module.exports = mongoose.model("Purchase", Purchase);
