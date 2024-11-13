const User = require('../../models/user.model'); 

class SuspendProfileController {
    async suspendProfile(req, res) {
        const { name } = req.params;

        try {
            const user = await User.findOneAndUpdate(
                { 'profile.name': name },
                { 'profile.suspended': true }, // Assuming profile has a suspended field
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            res.status(200).json({ message: 'Profile suspended successfully', user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SuspendProfileController();
