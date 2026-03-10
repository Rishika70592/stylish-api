const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.phone_no
  });
});


router.put("/profile", auth, async (req, res) => {
  const { name, mobile } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
    name,
    phone_no: mobile
  });

  res.json({
    success: true,
    message: "Profile updated successfully"
  });
});

module.exports = router;
