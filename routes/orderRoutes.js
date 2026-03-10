const express = require("express");
const router = express.Router();
const Product = require("../models/productmodel");
const Order = require("../models/orderModel");
const authMiddleware = require("../middleware/authMiddleware");


const generateOrderId  = ()=> {
       return "ORD" + Math.floor(100000 + Math.random() * 900000);
};

router.post("/", authMiddleware, async(res, req) =>{
    try {
    const { addressId, paymentMethod } = req.body;
    const userId = req.user.id;

      const cartItems = await Cart.find({ userId });
      if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let orderItems = [];
    totalAmount = 0 ;
    for (let cartItem in cartItems){
        const product = await Product.findById(cartItem.productId);
        if(!product) continue;
          const itemTotal = product.price * cartItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity: cartItem.quantity,
        price: product.price
      });

    }

     const newOrder = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      addressId,
      paymentMethod,
      orderId
    });

  await Cart.deleteMany({ userId });

    res.json({
      success: true,
      orderId: newOrder.orderId,
      message: "Order placed successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
    }
});
module.exports = router;

