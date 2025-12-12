require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");
// const seed = require("./utility/seed")
const PORT = process.env.PORT || 5000;
// seed();
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

