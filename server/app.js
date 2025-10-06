const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'https://mycontact-front.onrender.com',
  credentials: true
}));

const contactRoutes = require('./controllers/contact');
app.use('/contact', contactRoutes);

const authRoutes = require('./controllers/auth');
app.use('/auth', authRoutes);

module.exports = app;