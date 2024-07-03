const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    const query = `
        SELECT u.id, u.username, u.profile_picture
        FROM users u
        INNER JOIN matches m ON (u.id = m.user_id_1 OR u.id = m.user_id_2)
        WHERE (m.user_id_1 = ? OR m.user_id_2 = ?) AND u.id != ?
    `;
    db.all(query, [req.session.user.id, req.session.user.id, req.session.user.id], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send('Error fetching chat list');
        } else {
            res.render('chat', { chats: rows });
        }
    });
});

router.get('/:userId', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    const { userId } = req.params;
    const query = `
        SELECT * FROM messages
        WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
        ORDER BY timestamp ASC
    `;
    db.all(query, [req.session.user.id, userId, userId, req.session.user.id], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send('Error fetching chat');
        } else {
            res.render('chat_detail', { messages: rows, userId });
        }
    });
});

router.post('/send', (req, res) => {
    const { receiverId, message } = req.body;
    const query = `INSERT INTO messages (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, ?)`;
    const timestamp = new Date().toISOString();
    db.run(query, [req.session.user.id, receiverId, message, timestamp], (err) => {
        if (err) {
            console.error(err.message);
            res.send('Error sending message');
        } else {
            res.send('Message sent');
        }
    });
});

module.exports = router;
