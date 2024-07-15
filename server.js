const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors'); // Import cors package

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// CORS configuration
app.use(cors({ origin: 'https://tugbaapuhan.github.io' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'js')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// User database simulation
let users = [];

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        res.status(400).send('User already exists!');
    } else {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error');
            }
            users.push({ username, password: hash });
            res.status(201).send('Registration successful!');
        });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error');
            }
            if (result) {
                req.session.user = user;
                res.status(200).send('Login successful!');
            } else {
                res.status(400).send('Invalid password!');
            }
        });
    } else {
        res.status(400).send('User not found!');
    }
});

// Send email endpoint
app.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_USER,
        subject: `Contact form submission from ${req.body.name}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
