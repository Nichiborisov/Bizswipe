const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    const userId = req.session.user.id;
    const userQuery = `SELECT * FROM users WHERE id = ?`;
    const postsQuery = `SELECT * FROM posts WHERE user_id = ?`;

    db.get(userQuery, [userId], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.send('Error fetching user data');
        }

        db.all(postsQuery, [userId], (err, posts) => {
            if (err) {
                console.error(err.message);
                return res.send('Error fetching posts');
            }

            res.render('profile', { user, posts });
        });
    });
});

router.post('/', (req, res) => {
    const { username, bio, keywords } = req.body;
    const query = `UPDATE users SET username = ?, bio = ?, keywords = ? WHERE id = ?`;

    db.run(query, [username, bio, keywords, req.session.user.id], function(err) {
        if (err) {
            console.error(err.message);
            return res.send('Error updating profile');
        }

        res.redirect('/profile');
    });
});

module.exports = router;
