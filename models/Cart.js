import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    name: { type: String, required: true },
    paid: { type: String, required: true },
    quantity: {type: String, required: true},
    amount: { type: String, required: true }
});

export default model('Cart', cartSchema);
