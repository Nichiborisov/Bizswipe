const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const swipeRoutes = require('./routes/swipe');
const chatRoutes = require('./routes/chat');
const blockRoutes = require('./routes/block');
const indexRoutes = require('./routes/index'); // Add this line

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/swipe', swipeRoutes);
app.use('/chat', chatRoutes);
app.use('/block', blockRoutes);
app.use('/', indexRoutes); // Add this line

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
