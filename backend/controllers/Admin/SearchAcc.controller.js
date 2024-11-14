const { searchAccount } = require('../../models/user.model');

class SearchAccController {
    async searchAccount(req, res) {
        const id  = req.query;

        try {
            // Call the searchAccount function
            const user = await searchAccount(id);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);

            // Check for specific error messages
            if (error.message === 'Account not found') {
                return res.status(404).json({ message: error.message });
            }

            // Handle generic errors
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SearchAccController();
