const jwt = require('jsonwebtoken');
const Seller = require('../../models/seller.model');

class LoginSellerController {
    async login(req, res) {
        const { email, pw } = req.body;

        try {
            const seller = await Seller.login(email, pw);

            // Generate JWT
            const token = jwt.sign(
                { id: seller._id, email: seller.email, role: 'seller' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new LoginSellerController();
