const mongoose = require("mongoose");
const dotenv = require("dotenv");

module.exports = () => {
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
