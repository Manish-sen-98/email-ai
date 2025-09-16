require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const emailRoutes = require('./route/emailRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', emailRoutes);

// Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
