const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { email, password, username, bio, keywords } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (email, password, username, bio, keywords) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [email, hashedPassword, username, bio, keywords], function(err) {
        if (err) {
            console.error(err.message);
            res.send('Error registering user');
        } else {
            req.session.user = { id: this.lastID, username };
            res.redirect('/profile');
        }
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], async (err, user) => {
        if (err) {
            console.error(err.message);
            res.send('Error logging in');
        } else if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user.id, username: user.username };
            res.redirect('/profile');
        } else {
            res.send('Invalid email or password');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
