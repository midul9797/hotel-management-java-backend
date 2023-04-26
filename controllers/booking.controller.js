const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Give a name"],
      minLength: [3, "Name must be at least 3 Characters"],
      maxLength: [100, "Name is too large"],
    },
    mobile: {
      type: String,
      required: [true, "Give a moblie number"],
      unique: true,
      minLength: [11, "mobile number must be at least 11 Number"],
      maxLength: [11, "Username is too large"],
    },
    age: {
      type: String,
      required: [true, "Provide age"],
    },
    roomType: {
      type: String,
      required: [true, "Give a Password"],
    },
    bedType: {
      type: String,
      required: [true, "Give a Bed Type"],
    },
    rooms: {
      type: String,
      required: [true, "Give a Number"],
    },
    checkIn: {
      type: String,
      required: [true, "Give a Date"],
    },
    stayingDays: {
      type: String,
      required: [true, "Give a Number"],
    },
  },
  { collection: "Booking" }
);
const Booking = mongoose.model("Booking", bookingSchema);
Booking.createCollection();
module.exports.getAllBookings = async (req, res, next) => {
  try {
    const queryObject = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete queryObject[field]);
    let sortBy, dataLimit, allFields, page;
    if (req.query.sort) {
      sortBy = req.query.sort.split(",").join(" ");
    }
    if (req.query.limit) {
      dataLimit = req.query.limit;
      console.log(dataLimit);
    } else dataLimit = 20;
    if (req.query.fields) allFields = req.query.fields.split(",").join(" ");
    if (req.query.page) page = req.query.page;
    else page = 1;
    const skip = (page - 1) * dataLimit;
    const bookings = await Booking.find(queryObject)
      .sort(sortBy)
      .limit(+dataLimit)
      .select(allFields)
      .skip(skip);
    let data = [];
    bookings.map((booking) => {
      let a = [];
      a.push(booking.name);
      a.push(booking.mobile);
      a.push(booking.age);
      a.push(booking.roomType);
      a.push(booking.bedType);
      a.push(booking.rooms);
      a.push(booking.checkIn);
      a.push(booking.stayingDays);
      data.push(a);
    });
    let d = JSON.stringify(data);

    if (d.length > 1) {
      d = d.slice(1, -1);
    } else {
      d = ""; // or any desired value for an empty string
    }

    const s = d
      .replace(/\[/g, "")
      .replace(/\"/g, "")
      .replace(/\],/g, "->")
      .replace(/\]/g, "->");
    res.send(s);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports.addBooking = async (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    const result = await booking.save();
    res.send(booking);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
module.exports.getOneBooking = async (req, res, next) => {
  try {
    const { mobile } = req.params;
    const booking = await Booking.findOne({ mobile: mobile });
    const data = [];
    data.push(booking.name);
    data.push(booking.roomType);
    data.push(booking.bedType);
    data.push(booking.rooms);
    data.push(booking.stayingDays);
    data.push(booking.checkIn);
    data.push(booking.age);
    let d = JSON.stringify(data);

    if (d.length > 1) {
      d = d.slice(1, -1);
    } else {
      d = ""; // or any desired value for an empty string
    }
    const s = d.replace(/\"/g, "");
    res.send(s);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
module.exports.deleteBooking = async (req, res, next) => {
  try {
    const { mobile } = req.params;
    await Booking.deleteOne({ mobile: mobile });
    res.send("deleted");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
// module.exports.getOneUser = async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     const user = await Booking.findOne({ username: username });
//     res.send(user.password);
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };
// module.exports.updateTour = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const tour = await Tour.updateOne({ _id: id }, { $set: req.body });
//     res.status(200).json({
//       status: "update successful",
//       data: tour,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };
// module.exports.trending = async (req, res, next) => {
//   try {
//     const cheapest = await Tour.find({}).sort({ views: -1 }).limit(3);
//     console.log(cheapest);
//     res.status(200).json({
//       status: "success",
//       data: cheapest,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };
// module.exports.cheapest = async (req, res, next) => {
//   try {
//     const cheapest = await Tour.find({}).sort({ price: 1 }).limit(3);
//     console.log(cheapest);
//     res.status(200).json({
//       status: "success",
//       data: cheapest,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       message: error.message,
//     });
//   }
// };
