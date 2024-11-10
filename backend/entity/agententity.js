const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define the Agent schema
const agentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'agent' },
    active: { type: Boolean, default: true }
});

// Pre-save middleware for hashing passwords
agentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Agent login method
agentSchema.methods.login = async function (username, password) {
    const agent = await this.constructor.findOne({ username });
    if (!agent) throw new Error('Invalid username or password');

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) throw new Error('Invalid username or password');

    const token = jwt.sign(
        { userId: agent._id, role: agent.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    return { id: agent._id, username: agent.username, role: agent.role, token };
};

const AgentAcc = mongoose.model('AgentAcc', agentSchema);

module.exports = AgentAcc;