const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = require('./app');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DBMONGO)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Could not connect to MongoDB", error));

const authRoutes = require('./controllers/auth');
app.use('/auth', authRoutes);

const contactRoutes = require('./controllers/contact');
app.use('/contact', contactRoutes);

const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerDocument = yaml.load('./config/openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});