const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsedCar = require('../../models/usedcar.model');

class LoginCarAgentController {
    async login(req, res) {
        const { id, password } = req.body;

        try {
            // Find the car agent by ID
            const carAgent = await CarAgent.findById(id);
            if (!carAgent) {
                return res.status(404).json({ message: 'Car agent not found' });
            }

            // Validate password
            const isPasswordValid = await bcrypt.compare(password, carAgent.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: carAgent._id, role: 'caragent' },
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

module.exports = new LoginCarAgentController();
