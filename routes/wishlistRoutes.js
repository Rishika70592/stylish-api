const express = require("express");
const router = express.Router();
const Product = require("../models/productmodel");
const Wishlist = require("../models/wishlistModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, async(res,req) => {
try {
    const wishlistItems = await Wishlist.find({userId : req.user.id});
    let items = [];

    for (let item of wishlistItems) {
      const product = await Product.findById(item.productId);

      if (product) {
        items.push({
          wishlistItemId: item._id,
          productId: product._id,
          name: product.name,
          price: product.price
        });
      }
    }
    res.json({items});
}catch(err){
    res.status(500).json({message : err.message});
}
});

router.delete("/remove/:wishlistItemId", authMiddleware, async (req, res) => {
  try {
    const { wishlistItemId } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({
      _id: wishlistItemId,
      userId: req.user.id
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    res.json({
      success: true,
      message: "Removed from wishlist"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

