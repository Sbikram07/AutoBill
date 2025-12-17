const stripe = require("../config/stripe.config");
const Bill = require("../model/bill.model");


 const createCheckoutSession = async (req, res) => {
  try {

    const { billId, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "product name" },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/success/${billId}`,
      cancel_url: `http://localhost:5173/failed/${billId}`,
      metadata: {
          billId
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error:${error.message}`,
    });
  }
};


const markBillPaid = async (req, res) => {
  try {

    const { billId } = req.params;

    const bill = await Bill.findById(billId);
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    bill.payment = {
      status: "paid",
      provider: "stripe",
      paidAt: new Date(),
    };

    await bill.save();

    return res.status(200).json({
      success: true,
      message: "Bill marked as paid",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};


module.exports = { createCheckoutSession, markBillPaid };