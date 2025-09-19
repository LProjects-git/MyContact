const express = require('express');
const app = express();
app.use(express.json());

const contactRoutes = require('./controllers/contact');
app.use('/contact', contactRoutes);

const authRoutes = require('./controllers/auth');
app.use('/auth', authRoutes);

module.exports = app;