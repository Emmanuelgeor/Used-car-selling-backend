const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    active: { type: Boolean, default: true } // For suspending accounts
});

// Pre-save middleware for hashing passwords
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Admin login method
adminSchema.methods.login = async function (username, password) {
    const admin = await this.constructor.findOne({ username });
    if (!admin) throw new Error('Invalid username or password');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid username or password');

    const token = jwt.sign(
        { userId: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    return { id: admin._id, username: admin.username, role: admin.role, token };
};

// Static method to create an account
adminSchema.statics.createAccount = async function (username, password, role) {
    try {
        const existingUser = await this.findOne({ username });
        if (existingUser) throw new Error('Username already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.create({ username, password: hashedPassword, role });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user account: ' + error.message);
    }
};

// Static method to view all accounts
adminSchema.statics.viewAllAccounts = async function () {
    try {
        return await this.find({});
    } catch (error) {
        throw new Error('Error fetching user accounts: ' + error.message);
    }
};

// Static method to update an account
adminSchema.statics.updateAccount = async function (id, updates) {
    try {
        const updatedUser = await this.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user account: ' + error.message);
    }
};

// Static method to suspend an account
adminSchema.statics.suspendAccount = async function (id) {
    try {
        const suspendedUser = await this.findByIdAndUpdate(id, { active: false }, { new: true });
        if (!suspendedUser) throw new Error('User not found');
        return suspendedUser;
    } catch (error) {
        throw new Error('Error suspending user account: ' + error.message);
    }
};

// Static method to search accounts
adminSchema.statics.searchAccount = async function (username) {
    try {
        return await this.find({ username: new RegExp(username, 'i') }); // Case-insensitive search
    } catch (error) {
        throw new Error('Error searching user accounts: ' + error.message);
    }
};

const AdminAcc = mongoose.model('AdminAcc', adminSchema);

module.exports = AdminAcc;