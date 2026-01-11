const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
// const { default: middleware } = require('./middleware/middleware');

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

try {
    mongoose
        .connect("mongodb://127.0.0.1:27017/PIZZARIADB")
        .then(() => { console.log("Connected!") })
        .catch((err) => { console.log(`Not connected due to ${err}`) });

} catch (error) {
    console.log("Error in connectiong mongodb")
}

app.use('/api/ingredients', require('./routes/ingredientRoutes'));
app.use('/api/pizzas', require("./routes/pizzaRoutes"));
app.use('/api/cart', require('./routes/cartRoutes'));

app.post('/api/signup', (req, res) => {
    const { username, password, email, contact } = req.body;

    res.send(username, password);
});


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

});

app.listen(port, "0.0.0.0", () => {
    console.log(`!Port is running on ${port}!`)
});