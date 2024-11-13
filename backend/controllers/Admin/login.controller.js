const User = require('../../models/user.model'); 
const jwt = require('jsonwebtoken');

class LoginController {
    // Method to authenticate a user
    async authenticateUser(req, res) {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Validate the password
            const isPasswordValid = await user.isPasswordValid(password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate a JWT
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new LoginController();
