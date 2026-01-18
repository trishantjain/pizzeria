const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// Seed pizzas with sample data
router.get('/seed', async (req, res) => {
    try {
        const pizzasData = [
            {
                id: '0001', type: 'veg', price: 200, name: 'Margherita',
                image: 'https://thumb7.shutterstock.com/display_pic_with_logo/2793292/246331354/stock-photo-pizza-margherita-italian-246331354.jpg',
                description: 'Classic Italian pizza with fresh mozzarella and basil',
                ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'basil'],
                topping: ['Mushroom', 'Capsicum', 'Black beans']
            },
            {
                id: '0002', type: 'veg', price: 260, name: 'Farmhouse',
                image: 'https://thumb1.shutterstock.com/display_pic_with_logo/1003451/756734262/stock-photo-delicious-italian-pizza-with-ham-mushrooms-tomatoes-cheese-and-olives-on-a-dark-background-756734262.jpg',
                description: 'Loaded with fresh vegetables and cheese',
                ingredients: ['pizza dough', 'tomato sauce', 'cheese', 'vegetables'],
                topping: ['Mushroom', 'Capsicum', 'Sweet corn']
            },
            {
                id: '0003', type: 'nonveg', price: 400, name: 'Chicken Feast',
                image: 'https://thumb9.shutterstock.com/display_pic_with_logo/2793292/332497832/stock-photo-mixture-pizza-italian-food-332497832.jpg',
                description: 'Loaded with chicken and premium toppings',
                ingredients: ['pizza dough', 'BBQ sauce', 'cheese', 'chicken'],
                topping: ['Chicken', 'Chicken Sausage', 'Fried Onion']
            }
        ];

        await Pizza.deleteMany({});
        await Pizza.insertMany(pizzasData);
        res.json({ message: 'Pizzas seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all pizzas
router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;