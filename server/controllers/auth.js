const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();

router.get('/protected', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already used' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }   

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email },process.env.secretkey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  } 
});

module.exports = router;