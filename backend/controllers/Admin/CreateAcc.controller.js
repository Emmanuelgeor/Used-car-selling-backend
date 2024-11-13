const User = require('../../models/user.model'); 
const bcrypt = require('bcryptjs');

class CreateAccController {
    async createUser(req, res) {
        const { id, password, email, role } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ id, email, role, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'Account created successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new CreateAccController();
