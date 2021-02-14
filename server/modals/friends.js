const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("friend", friendSchema);

module.exports = Friend;
