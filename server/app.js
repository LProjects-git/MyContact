// app.js
const express = require('express');
const app = express();
app.use(express.json());

// tes routes ici
const contactRoutes = require('./routes/contact');
app.use('/contact', contactRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

module.exports = app;