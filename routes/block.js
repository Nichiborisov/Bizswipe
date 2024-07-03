const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

router.post('/', (req, res) => {
    const { blockedUserId } = req.body;

    connection.query('INSERT INTO blocked_users (user_id, blocked_user_id) VALUES (?, ?)', 
    [req.session.userId, blockedUserId], (error, results) => {
        if (error) throw error;
        res.redirect('/profile');
    });
});

module.exports = router;
