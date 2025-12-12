const bill = require("../model/bill.model");
const billTemplate = require("../utility/billTemplate");
const puppeteer = require("puppeteer");

const createBill = async (req, res) => {
  try {
    // console.log("endpoint hit for bill")
    const { customer_name, customer_phone, customer_email, customer_address } =
      req.body;
    const newBill = new bill({
      customer_name,
      customer_phone,
      customer_email,
      customer_address,
    });
    await newBill.save();
    res.cookie("bill_id", newBill._id,{
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Bill created successfully",
      bill_id: newBill._id,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: `Internal server error:${error.message}`,
    });
  }
};


const exportBill = async (req, res) => {
  try {
    const BillDoc = await bill.findById(req.params.id);


    res.clearCookie("bill_id");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = billTemplate(BillDoc);
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=bill-${req.params.id}.pdf`
    );

    
    return res.send(pdfBuffer);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error}`,
    });
  }
};

module.exports = {
  createBill,
  exportBill,
};
