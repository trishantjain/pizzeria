const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.get('/', async (req, res) => {
    const items = await Cart.find();

    res.json(items);
});

router.post('/add', async (req, res) => {
    const item = new Cart(req.body);

    await item.save();
});

router.get('/:id', async (req, res) => {
    await Cart.findByIdAndUpdate(req.params.id, {
        quantity: req.body.quantity
    });

    res.json({ message: "Quantity Updated" });
});



module.exports = router;
