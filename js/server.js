const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the root of the project directory
app.use(express.static(path.join(__dirname, '..')));

// Route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
