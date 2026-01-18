const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// Seed ingredients with sample data
router.get('/seed', async (req, res) => {
    try {
        const ingredientsData = [
            { id: 101, tname: 'Pepperoni', price: 110, image: 'https://thumb1.shutterstock.com/display_pic_with_logo/55755/161642033/stock-photo-single-slice-of-pepperoni-meat-isolated-on-white-with-path-shot-from-above-161642033.jpg' },
            { id: 102, tname: 'Mushroom', price: 35, image: 'https://thumb9.shutterstock.com/display_pic_with_logo/1207547/568114672/stock-photo-fresh-cultivated-button-mushrooms-and-twigs-of-parsley-in-the-wooden-basket-one-whole-mushroom-and-568114672.jpg' },
            { id: 103, tname: 'Capsicum', price: 30, image: 'https://thumb1.shutterstock.com/display_pic_with_logo/2920668/505890697/stock-photo-green-bell-pepper-isolated-on-white-background-505890697.jpg' },
            { id: 104, tname: 'Sweet corn', price: 25, image: 'https://thumb9.shutterstock.com/display_pic_with_logo/64192/252519832/stock-photo-sweet-corn-grains-in-a-bowl-on-white-background-252519832.jpg' },
            { id: 105, tname: 'Fried Onion', price: 20, image: 'https://thumb7.shutterstock.com/display_pic_with_logo/4011733/611057418/stock-photo-fried-onion-rings-isolated-on-white-background-611057418.jpg' },
            { id: 106, tname: 'Chicken', price: 60, image: 'https://thumb7.shutterstock.com/display_pic_with_logo/371512/583587001/stock-photo-fresh-raw-chicken-isolated-on-white-583587001.jpg' },
            { id: 107, tname: 'Chicken Sausage', price: 70, image: 'https://thumb7.shutterstock.com/display_pic_with_logo/2043148/314438856/stock-photo-grilled-sausages-isolated-on-white-background-314438856.jpg' },
            { id: 108, tname: 'Black beans', price: 45, image: 'https://thumb1.shutterstock.com/display_pic_with_logo/180783430/755093356/stock-photo-black-beans-grain-on-white-background-755093356.jpg' }
        ];

        await Ingredient.deleteMany({});
        await Ingredient.insertMany(ingredientsData);
        res.json({ message: 'Ingredients seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all ingredients
router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;