const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Give a name"],
      // minLength: [3, "Name must be at least 3 Characters"],
      // maxLength: [100, "Name is too large"],
    },
    username: {
      type: String,
      required: [true, "Give a username"],
      unique: true,
      // minLength: [3, "Username must be at least 3 Characters"],
      // maxLength: [100, "Username is too large"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
      // unique: true,
      maxLength: [100, "Too large"],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: [true, "Give a Password"],
      // password: {
      //   type: String,
      //   required: true,
      //   validate: {
      //     validator: function (v) {
      //       return v && v.length >= 8;
      //     },
      //     message: "Password must have at least 8 characters",
      //   },
      //   match: /(?=.*[A-Z])/,
      //   match: /(?=.*[a-z])/,
      //   match: /(?=.*[0-9])/,
      // },
    },
  },
  { collection: "user" }
);
const User = mongoose.model("User", userSchema);

module.exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
module.exports.getOneUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    res.send(user.password);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
module.exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await Tour.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json({
      status: "update successful",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
module.exports.trending = async (req, res, next) => {
  try {
    const cheapest = await Tour.find({}).sort({ views: -1 }).limit(3);
    console.log(cheapest);
    res.status(200).json({
      status: "success",
      data: cheapest,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
module.exports.cheapest = async (req, res, next) => {
  try {
    const cheapest = await Tour.find({}).sort({ price: 1 }).limit(3);
    console.log(cheapest);
    res.status(200).json({
      status: "success",
      data: cheapest,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
