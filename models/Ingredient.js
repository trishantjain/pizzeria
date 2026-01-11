const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false }
});

// export default model('Ingredient', ingredientSchema);
module.exports = mongoose.model('Ingredient', ingredientSchema);

