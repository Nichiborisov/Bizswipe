const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/users.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Posts table created successfully.");
    });
});

db.close();
