require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const connection = require("./db");

connection();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

const port = process.env.PORT;

// Routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

app.listen(port, () => console.log("Server running on port " + port));