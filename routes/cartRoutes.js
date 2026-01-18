const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { validateCartItem } = require('../middleware/middleware');

// Get all cart items
router.get('/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        console.log(userID);
        const items = await Cart.find({ userId: userID });
        console.log(items);

        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add item to cart (with validation middleware)
router.post('/', validateCartItem, async (req, res) => {
    try {
        const { name, price, quantity, image, toppings } = req.body;

        const newItem = new Cart({
            name,
            price,
            quantity: quantity || 1,
            image,
            toppings: toppings || []
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update cart item quantity
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true }
        );

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete cart item
router.delete('/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
