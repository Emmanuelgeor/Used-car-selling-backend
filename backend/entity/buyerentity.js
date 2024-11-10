const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const buyerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'buyer' },
    active: { type: Boolean, default: true }
});

// Pre-save middleware for hashing passwords
buyerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Buyer login method
buyerSchema.methods.login = async function (username, password) {
    const buyer = await this.constructor.findOne({ username });
    if (!buyer) throw new Error('Invalid username or password');

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) throw new Error('Invalid username or password');

    const token = jwt.sign(
        { userId: buyer._id, role: buyer.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    return { id: buyer._id, username: buyer.username, role: buyer.role, token };
};

const BuyerAcc = mongoose.model('BuyerAcc', buyerSchema);

module.exports = BuyerAcc;