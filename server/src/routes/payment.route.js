const express=require("express");
const router=express.Router();
const {createCheckoutSession,markBillPaid}=require("../controller/payment.controller");
router.post("/create-payment",createCheckoutSession);
router.patch("/mark-paid/:billId", markBillPaid);
module.exports=router;