const express = require('express');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Route to handle subscription
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate if email and name are provided
    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    // Check if email already exists
    const existingUser = await Subscription.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    // Create a new subscription
    const newSubscription = new Subscription({ email, name });
    await newSubscription.save();

    return res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

