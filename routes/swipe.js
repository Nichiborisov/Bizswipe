const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    const query = `SELECT * FROM users WHERE id != ? AND id NOT IN (SELECT blocked_user_id FROM blocked_users WHERE user_id = ?)`;
    db.all(query, [req.session.user.id, req.session.user.id], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send('Error fetching profiles');
        } else {
            res.render('swipe', { users: rows });
        }
    });
});

router.post('/action', (req, res) => {
    const { userId, action } = req.body;
    const query = `INSERT INTO actions (user_id, target_user_id, action) VALUES (?, ?, ?)`;
    db.run(query, [req.session.user.id, userId, action], (err) => {
        if (err) {
            console.error(err.message);
            res.send('Error performing action');
        } else {
            res.send('Action performed');
        }
    });
});

module.exports = router;
