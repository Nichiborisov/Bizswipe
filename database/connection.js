const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Создание таблиц
db.serialize(() => {
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, username TEXT, bio TEXT, profile_picture TEXT, keywords TEXT)');
    db.run('CREATE TABLE messages (id INTEGER PRIMARY KEY, sender_id INTEGER, receiver_id INTEGER, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');
    db.run('CREATE TABLE swipes (id INTEGER PRIMARY KEY, swiper_id INTEGER, swiped_id INTEGER, action TEXT)');
    db.run('CREATE TABLE blocks (id INTEGER PRIMARY KEY, blocker_id INTEGER, blocked_id INTEGER)');
});

module.exports = db;
