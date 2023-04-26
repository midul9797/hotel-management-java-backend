let count = 1000;

const invoiceNumber = (req, res, next) => {
  count++;
  req.customValue = count;
  // res.send("tools found");
  next();
};

module.exports = invoiceNumber;
