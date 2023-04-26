const express = require("express");
const PDFDocument = require("pdfkit");
require("dotenv").config();
const cors = require("cors");
const tourRoutes = require("./routes/user.routes");
const DBConnect = require("./utils/DBConnect");
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

DBConnect();
app.use("/", tourRoutes);

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

process.on("uunhandleRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process, exit(1);
  });
});
