const User = require('../../models/user.model'); 

class SearchAccController {
    async searchAccount(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'Account not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SearchAccController();
