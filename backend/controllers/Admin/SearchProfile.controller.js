const { searchProfile } = require('../../models/user.model');

class SearchProfileController {
    async searchProfile(req, res) {
        const { name} = req.query;

        try {
            const profile = await searchProfile(name); // Correct function invocation
            res.status(200).json(profile);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
}

module.exports = new SearchProfileController();
