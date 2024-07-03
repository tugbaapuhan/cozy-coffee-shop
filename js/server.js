const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

let cart = [];

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Serve static files from the html directory
app.use(express.static(path.join(__dirname, '..')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

app.post('/add-to-cart', (req, res) => {
    const { item } = req.body;
    cart.push(item);
    res.json({ message: 'Item added to cart', cartCount: cart.length });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
