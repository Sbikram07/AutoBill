const express=require("express");
const router=express.Router();
const {login,logout,verifyPin,createAdmin}=require("../controller/auth.controller");
router.post("/login",login);
router.post("/logout",logout);
router.post("/verify-pin",verifyPin);
router.post("/create-admin",createAdmin);
module.exports=router;