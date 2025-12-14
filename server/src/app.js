const express = require("express"); 
const cors = require("cors");

const cookieParser = require("cookie-parser");
const authroute = require("./routes/auth.route");
const billRoute = require("./routes/bill.route");
const paymentRoute = require("./routes/payment.route");

const app = express();


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/auth",authroute)
app.use("/api/bill",billRoute);
app.use("/api/payment",paymentRoute)

module.exports = app;