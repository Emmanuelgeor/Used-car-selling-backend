const jwt = require('jsonwebtoken');
const Buyer = require('../../models/buyer.model');

class LoginBuyerController {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const buyer = await Buyer.login(email, password);

            // Generate JWT
            const token = jwt.sign(
                { id: buyer._id, email: buyer.email, role: 'buyer' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new LoginBuyerController();
