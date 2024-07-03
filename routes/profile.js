const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

router.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }

    connection.query('SELECT * FROM users WHERE id = ?', [req.session.userId], (error, results) => {
        if (error) throw error;
        res.render('profile', { user: results[0] });
    });
});

router.post('/', (req, res) => {
    const { username, bio, keywords } = req.body;

    connection.query('UPDATE users SET username = ?, bio = ?, keywords = ? WHERE id = ?', 
    [username, bio, keywords, req.session.userId], (error, results) => {
        if (error) throw error;
        res.redirect('/profile');
    });
});

module.exports = router;
