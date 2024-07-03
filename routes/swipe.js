const express = require('express');
const router = express.Router();
const db = require('../database/connection'); // Assuming the connection file is correct

router.get('/', (req, res) => {
    const userId = req.session.userId;
    
    db.query('SELECT * FROM users WHERE id != ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching profiles');
        }
        res.render('swipe', { users: results });
    });
});

router.post('/like', (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.session.userId;
    
    db.query('INSERT INTO likes (user_id, liked_user_id) VALUES (?, ?)', [currentUserId, userId], (err, result) => {
        if (err) {
            return res.json({ success: false, message: 'Error liking user' });
        }
        res.json({ success: true });
    });
});

router.post('/dislike', (req, res) => {
    const { userId } = req.body;
    const currentUserId = req.session.userId;
    
    db.query('INSERT INTO dislikes (user_id, disliked_user_id) VALUES (?, ?)', [currentUserId, userId], (err, result) => {
        if (err) {
            return res.json({ success: false, message: 'Error disliking user' });
        }
        res.json({ success: true });
    });
});

module.exports = router;
