require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const usedCarRoutes = require('./routes/usedCarRoutes');
const sellerRoutes = require('./routes/sellerRoutes'); // Import Seller routes

const app = express();
app.use(cors());
app.use(express.json());

//serve static html files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/createUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'createUser', 'createUser.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api', authRoutes);
app.use('/buyer', buyerRoutes);
app.use('/caragent', usedCarRoutes);
app.use('/seller', sellerRoutes);

// Start server
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
