const express = require("express");
const router = express.Router();

const Product = require("../models/productmodel");
const Wishlist = require("../models/wishlistModel");

const authMiddleware = require("../middleware/authMiddleware");



router.post("/add", authMiddleware, async (req, res) => {
  try {

    const { productId } = req.body;

    const existing = await Wishlist.findOne({
      userId: req.user.id,
      productId
    });

    if (existing) {
      return res.json({
        message: "Already in wishlist"
      });
    }

    const item = await Wishlist.create({
      userId: req.user.id,
      productId
    });

    res.json({
      success: true,
      message: "Added to wishlist",
      wishlistItemId: item._id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/", authMiddleware, async (req, res) => {
  try {

    const wishlistItems = await Wishlist.find({
      userId: req.user.id
    });

    let items = [];

    for (const item of wishlistItems) {

      const product = await Product.findById(item.productId);

      if (product) {
        items.push({
          wishlistItemId: item._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        });
      }
    }

    res.json({
      success: true,
      items
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
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
      return res.status(404).json({
        message: "Wishlist item not found"
      });
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