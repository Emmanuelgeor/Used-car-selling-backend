const User = require('../../models/user.model'); 

class SearchProfileController {
    async searchProfile(req, res) {
        const { name } = req.params;

        try {
            const profiles = await User.find({ 'profile.name': name }); // Assuming profile.name exists
            res.status(200).json(profiles);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SearchProfileController();
