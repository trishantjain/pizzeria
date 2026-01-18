// Request logging middleware
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};

// Validation middleware for cart items
const validateCartItem = (req, res, next) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ error: 'Missing required fields: name, price, image' });
    }

    if (price < 0) {
        return res.status(400).json({ error: 'Price must be non-negative' });
    }

    next();
};

module.exports = { requestLogger, errorHandler, validateCartItem };