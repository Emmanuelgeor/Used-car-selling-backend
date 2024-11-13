const User = require('../../models/user.model'); 

class UpdateProfileController {
    async updateProfile(req, res) {
        const { id, name, hp, preference, age } = req.body;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.profile = { name, hp, preference, age };
            await user.save();

            res.status(200).json({ message: 'Profile updated successfully', user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new UpdateProfileController();
