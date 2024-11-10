const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the Seller schema
const sellerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'seller' },
    active: { type: Boolean, default: true }
});

// Pre-save middleware for hashing passwords
sellerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Seller login method
sellerSchema.methods.login = async function (username, password) {
    const seller = await this.constructor.findOne({ username });
    if (!seller) throw new Error('Invalid username or password');

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) throw new Error('Invalid username or password');

    const token = jwt.sign(
        { userId: seller._id, role: seller.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    return { id: seller._id, username: seller.username, role: seller.role, token };
};

const SellerAcc = mongoose.model('SellerAcc', sellerSchema);

module.exports = SellerAcc;