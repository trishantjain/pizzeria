const express = require('express');
const Ingredient = require('../models/Ingredient');
const router = express.Router();

router.get('/', async (req, res) => {
    const ingredientsList = await Ingredient.find();

    res.json(ingredientsList);
});

module.exports =router;