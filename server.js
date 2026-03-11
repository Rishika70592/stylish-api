require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

app.use("/v1/auth", require("./routes/authRoutes"));
app.use("/v1/user", require("./routes/userRoutes"));
app.use("/v1", require("./routes/productRoutes"));
app.use("/v1/cart",require("./routes/cartRoutes"));
app.use("/v1/orders",require("./routes/orderRoutes"));
app.use("/v1/address",require("./routes/addressRoutes"));
app.use("/v1/wishlist",require("./routes/wishlistRoutes"));
app.use("/v1/review",require("./routes/reviewRoutes"));
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
