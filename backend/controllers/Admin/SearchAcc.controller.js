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
        }
    }
}

module.exports = new SearchAccController();
