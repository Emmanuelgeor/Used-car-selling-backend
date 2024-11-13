const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
    },
    address: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    profiles: [
        {
            name: { type: String, required: true },
            hp: { type: Number, required: true },
            preference: { type: String, required: true },
            age: { type: Number, required: true },
            active: { type: Boolean, default: true },
        },
    ],
});

// Static methods for User management

// User login
userSchema.statics.login = async function (id, pw) {
    const user = await this.findOne({ _id: id });
    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(pw, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');
    return user;
};

// Create a new user
userSchema.statics.createUser = async function (id, password, email, role) {
    const existingUser = await this.findOne({ $or: [{ _id: id }, { email }] });
    if (existingUser) throw new Error('User ID or email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this({
        id: id,
        password: hashedPassword,
        email,
        role,
        active: true,
    });

    return await user.save();
};

// View user details
userSchema.statics.viewAccount = async function (id) {
    const user = await this.findOne({ _id: id });
    if (!user) throw new Error('User not found');
    return user;
};

// Update user details
userSchema.statics.updateAccount = async function (id, password, email, role) {
    const updateFields = { email, role };

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
    }

    const user = await this.findByIdAndUpdate(id, updateFields, { new: true });
    if (!user) throw new Error('User not found');
    return user;
};

// Suspend a user account
userSchema.statics.suspendAccount = async function (id) {
    const user = await this.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!user) throw new Error('User not found');
    return user;
};

// Search users by ID pattern
userSchema.statics.searchAccounts = async function (id) {
    const users = await this.find({ _id: { $regex: id, $options: 'i' } });
    return users;
};

// Profile management methods

// Add a profile to a user
userSchema.statics.createProfile = async function (userId, name, hp, preference, age) {
    const user = await this.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    if (user.profiles.some((profile) => profile.name === name)) {
        throw new Error('Profile with the same name already exists');
    }

    user.profiles.push({ name, hp, preference, age, active: true });
    await user.save();
    return user;
};

// View a profile by name
userSchema.statics.viewProfile = async function (userId, name) {
    const user = await this.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    const profile = user.profiles.find((profile) => profile.name === name);
    if (!profile) throw new Error('Profile not found');

    return profile;
};

// Update a profile by name
userSchema.statics.updateProfile = async function (userId, name, hp, preference, age) {
    const user = await this.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    const profile = user.profiles.find((profile) => profile.name === name);
    if (!profile) throw new Error('Profile not found');

    profile.hp = hp;
    profile.preference = preference;
    profile.age = age;
    await user.save();

    return profile;
};

// Suspend a profile by name
userSchema.statics.suspendProfile = async function (userId, name) {
    const user = await this.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    const profile = user.profiles.find((profile) => profile.name === name);
    if (!profile) throw new Error('Profile not found');

    profile.active = false;
    await user.save();

    return profile;
};

// Search profiles by name pattern
userSchema.statics.searchProfiles = async function (userId, namePattern) {
    const user = await this.findOne({ _id: userId });
    if (!user) throw new Error('User not found');

    const matchedProfiles = user.profiles.filter((profile) =>
        new RegExp(namePattern, 'i').test(profile.name)
    );

    return matchedProfiles;
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
