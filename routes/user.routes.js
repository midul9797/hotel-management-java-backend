const express = require("express");
const bookingController = require("../controllers/booking.controller");
const userController = require("../controllers/user.controller");
const Invoice = require("../utils/createInvoice");
const invoiceNumber = require("../middleware/invoiceNumber");

const router = express.Router();

router
  .route("/booking")
  /**
   * @api {get} /tours Get All Tours
   * @apiDescription Get all tours details
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} All user
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(bookingController.getAllBookings)
  .post(bookingController.addBooking);
router
  .route("/download/:name/:mobile/:roomType/:bedType/:days/:rooms/:bill")
  .get(invoiceNumber, Invoice.createInvoice);
router
  .route("/booking/:mobile")
  .get(bookingController.getOneBooking)
  .delete(bookingController.deleteBooking);
router.route("/users/:username").get(userController.getOneUser);
router.route("/users").post(userController.addUser);
module.exports = router;
