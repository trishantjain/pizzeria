import { Schema, model } from 'mongoose';

const pizzaSchema = new Schema({
    topings: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
});

export default model('Pizza', pizzaSchema);