const mongoose = require("mongoose");
require("dotenv").config();
const DBConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://java_swing:${process.env.DATABASE}@cluster0.worr8fb.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Database connected");
    });
};
module.exports = DBConnect;
