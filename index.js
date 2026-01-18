const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const { requestLogger, errorHandler } = require('./middleware/middleware');
const cookieParser = require('cookie-parser');

const port = 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);  // Log all requests
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

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
app.use('/api/auth', require('./routes/authRoutes'));

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
    console.log(`!Port is running on ${port}!`)
});