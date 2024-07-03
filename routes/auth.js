const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/connection');
const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
    const { email, password, username, bio, keywords } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (email, password, username, bio, keywords) VALUES (?, ?, ?, ?, ?)', 
    [email, hashedPassword, username, bio, keywords], (err, result) => {
        if (err) {
            return res.status(500).send('Error registering user');
        }
        res.redirect('/auth/login');
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
        }

        req.session.userId = user.id;
        res.redirect('/profile');
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;
