const  express = require('express');
const  Cart = require('../models/cartModel');
const Product = require("../models/productmodel");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add",authMiddleware, async (req, res) => {
   try{
     const {productId, quantity} = req.body;
     const product = await Product.findById(productId);

      if (!product) {
         return res.status(404).json({ message: "Product not found" });
      }
      const cartItem = await Cart.create({
         userId: req.user.id, 
        productId,
        quantity
      });
      const totalAmount = product.price * quantity;
      res.json ({
        items:  [
            {
           cartItemId : cartItem._id,
           productID : product._id,
           name : product.name,
           price : product.price,
           quantity,

            }
        ],
        totalAmount
      })
    
   } catch(err){
res.status(500).json({ message: err.message });
   };
} );

router.get ("/", authMiddleware, async (req, res) => {
    try{
        const userId = req.user.id;
       const cartItems = await Cart.find({userId});
       let items = [];
    let totalAmount = 0;

             for (let cartItem of cartItems){
                const product = await Product.findById(cartItem.productId);

                if (product){
                    const itemTotal = product.price * cartItem.quantity;
                    totalAmount += itemTotal;

                }
                items.push({
                       cartItemId: cartItem._id,
          productId: product._id,
          name: product.name,
          quantity: cartItem.quantity,
          price: product.price
                });
             }
res.json({
    items,
    totalAmount
})
    } catch(err){
res.status(500).json({message: err.message});
    };
})

router.delete("/remove/:cartItemId", authMiddleware, async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await Cart.findOneAndDelete({
      _id: cartItemId,
      userId: req.user.id
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;