require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const emailRoutes = require('./route/emailRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res) => 
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
);


// Routes
app.use('/api', emailRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));