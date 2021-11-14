const mongoose = require("mongoose");
const item = require("../models/Item");
const Schema = mongoose.Schema;
const Option = new Schema(
  {
    slug: String,
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    detail: String,
    color: Array,
  },
  { collection: "options" }
);
module.exports = mongoose.model("Option", Option);
