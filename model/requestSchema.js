const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    bookname: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publication: {
      type: String,
      required: true,
    },
    edition: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
