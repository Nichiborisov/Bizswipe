const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

router.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }

    connection.query('SELECT * FROM chats WHERE user_id = ?', [req.session.userId], (error, results) => {
        if (error) throw error;
        res.render('chat', { chats: results });
    });
});

router.post('/', (req, res) => {
    const { recipientId, message } = req.body;

    connection.query('INSERT INTO chats (user_id, recipient_id, message) VALUES (?, ?, ?)', 
    [req.session.userId, recipientId, message], (error, results) => {
        if (error) throw error;
        res.redirect('/chat');
    });
});

module.exports = router;
