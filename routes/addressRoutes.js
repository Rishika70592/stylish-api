const express = require("express");
const router = express.Router();

const Address = require("../models/addressModel");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, street, city, state, pincode, phone } = req.body;

    const newAddress = await Address.create({
      userId: req.user.id,
      name,
      street,
      city,
      state,
      pincode,
      phone
    });

    res.json({
      success: true,
      message: "Address added successfully",
      addressId: newAddress._id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {

    const addresses = await Address.find({ userId: req.user.id });

    const formattedAddress = addresses.map(addr => ({
      addressId: addr._id,
      city: addr.city,
      pincode: addr.pincode
    }));

    res.json({
      success: true,
      addresses: formattedAddress
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;