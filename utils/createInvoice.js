const PDFDocument = require("pdfkit");
module.exports.createInvoice = (req, res, next) => {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  const { name, mobile, roomType, bedType, days, rooms, bill } = req.params;
  res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);
  generateHeader(doc);
  generateCustomerInformation(doc, name, mobile, bill, req.customValue);
  generateInvoiceTable(doc, bedType, roomType, bill, rooms, days);
  generateFooter(doc);
  doc.end();
};

function generateHeader(doc) {
  doc

    .fillColor("#444444")
    .fontSize(20)
    .text("Hotel Delta", 140, 60)
    .fontSize(10)
    .text("Hotel Delta", 200, 50, { align: "right" })
    .text("Mozaffor Nagor", 200, 65, { align: "right" })
    .text("Chittagong, Bangladesh", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, name, mobile, bill, invoiceNmbr) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoiceNmbr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Total Amount:", 50, customerInformationTop + 30)
    .text(bill, 150, customerInformationTop + 30)

    .text("Name:", 250, customerInformationTop)
    .font("Helvetica-Bold")
    .text(name, 350, customerInformationTop)
    .font("Helvetica")
    .text("Mobile:", 250, customerInformationTop + 15)
    .text(mobile, 350, customerInformationTop + 15)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, bedType, roomType, bill, rooms, days) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Description",
    "Cost per Room per Night",
    "Rooms",
    "Days",
    "Amount"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  const position = invoiceTableTop + 50;
  generateTableRow(
    doc,
    position,
    `${bedType} and ${roomType}`,
    bill / rooms / days + "Tk",
    rooms,
    days,
    bill + "Tk"
  );

  generateHr(doc, position + 20);

  const subtotalPosition = invoiceTableTop + 100;
  generateTableRow(doc, subtotalPosition, "", "", "Total", "", `${bill}Tk`);

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(doc, paidToDatePosition, "", "", "Paid", "", `${bill}Tk`);

  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(12)
    .text("Thank you. See you soon", 50, 720, { align: "center", width: 500 });
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  if (unitCost === "Paid") doc.font("Helvetica-Bold");
  doc
    .fontSize(10)
    .text(item, 50, y, { width: 150 })
    .text(description, 150, y, { width: 170, align: "center" })
    .text(unitCost, 330, y, { width: 70, align: "center" })
    .text(quantity, 410, y, { width: 70, align: "center" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}
