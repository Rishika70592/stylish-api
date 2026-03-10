const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, phone_no } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name, username, email, password: hashedPassword, phone_no
    });

    await user.save();
    res.json({ success: true, message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ success: false, message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({ success: false, message: 'Wrong password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
