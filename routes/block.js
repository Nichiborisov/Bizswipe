const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.post('/block', (req, res) => {
    const { userIdToBlock } = req.body;
    const userId = req.session.user.id;

    const query = `INSERT INTO blocked_users (user_id, blocked_user_id) VALUES (?, ?)`;
    db.run(query, [userId, userIdToBlock], (err) => {
        if (err) {
            console.error(err.message);
            res.send('Error blocking user');
        } else {
            res.send('User blocked successfully');
        }
    });
});

module.exports = router;
