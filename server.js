require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/", require("./routes/productRoutes"));
app.use("/cart",require("./routes/cartRoutes"));
app.use("/orders",require("./routes/orderRoutes"));
app.use("/address",require("./routes/addressRoutes"));
app.use("/wishlist",require("./routes/wishlistRoutes"));
app.use("/review",require("./routes/reviewRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
