const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = 'dhananjay'; // Replace with .env in production

// Admin Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
  console.log("Admin route loaded");

});
router.get('/test', (req, res) => {
  res.send('Admin route is working!');
});

module.exports = router;
