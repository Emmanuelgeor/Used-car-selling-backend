const User = require('../../models/user.model'); 

class CreateProfileController {
    async createProfile(req, res) {
        const { id, name, hp, preference, age } = req.body;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.profile = { name, hp, preference, age }; // Assuming `profile` is an embedded field
            await user.save();
            res.status(201).json({ message: 'Profile created successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new CreateProfileController();
