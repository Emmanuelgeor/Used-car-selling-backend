const User = require('../../models/user.model'); 

class UpdateAccController {
    async updateAccount(req, res) {
        const { id, password, email, role } = req.body;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            if (email) user.email = email;
            if (role) user.role = role;

            await user.save();

            res.status(200).json({ message: 'Account updated successfully', user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new UpdateAccController();
