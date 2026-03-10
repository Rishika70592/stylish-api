const express = require("express");
const Product = require("../models/productmodel");

const router = express.Router();

router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ products });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;