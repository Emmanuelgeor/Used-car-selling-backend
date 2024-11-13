
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied, token required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};
