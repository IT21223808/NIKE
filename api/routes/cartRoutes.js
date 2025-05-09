const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cart items' });
  }
});

// Add an item to the cart
router.post('/add', async (req, res) => {
  const { name, price, quantity, image } = req.body;

  try {
    // Check if the item already exists in the cart
    let cartItem = await Cart.findOne({ name });

    if (cartItem) {
      // If item exists, update the quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();
      res.json({ success: true, message: 'Item quantity updated in cart' });
    } else {
      // If item doesn't exist, create a new entry
      cartItem = new Cart({ name, price, quantity: quantity || 1, image });
      await cartItem.save();
      res.json({ success: true, message: 'Item added to cart' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add item to cart' });
  }
});

// Delete an item from the cart by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
  }
});

module.exports = router;