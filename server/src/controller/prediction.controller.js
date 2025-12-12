const Bill = require("../model/bill.model");
const Product = require("../model/product.model");
const FormData = require("form-data");
const axios = require("axios");

const detectProduct = async (req, res) => {
  // console.log("detect product end point hit")
  try {
    const bill_id = req.cookies.bill_id;

    if (!bill_id) {
      return res.status(400).json({
        success: false,
        message: "Bill ID missing in cookies",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Find bill
    const bill = await Bill.findById(bill_id);
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    // Prepare form-data for Python model
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Send to model backend
    const response = await axios.post(
      `${process.env.MODEL_URL}/predict`,
      formData,
      { headers: formData.getHeaders() }
    );

    // --- FIX: convert model response to iterable items ---
    const counts = response.data.counts || {}; // e.g., { orange: 2 }

    const modelItems = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));

    // Add items to bill
    // merge detected items into bill.products
    for (let item of modelItems) {
      const dbItem = await Product.findOne({ name: item.name });

      if (dbItem) {
        // check if item already exists in bill
        const existing = bill.products.find(
          (p) => p.product_name === dbItem.name
        );

        if (existing) {
          // update quantity
          existing.quantity += item.count;
          existing.subtotal = existing.quantity * dbItem.price;
        } else {
          // insert new product
          bill.products.push({
            product_name: dbItem.name,
            product_price: dbItem.price,
            quantity: item.count,
            subtotal: item.count * dbItem.price,
          });
        }
      }
    }

    // Update total amount
    bill.total_amount = bill.products.reduce(
      (sum, p) => sum + (p.subtotal || 0),
      0
    );

    await bill.save();

    res.status(200).json({
      success: true,
      message: "Products detected and added to bill",
      bill,
      // model_output: response.data,
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = { detectProduct };
