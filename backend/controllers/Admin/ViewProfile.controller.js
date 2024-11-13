const User = require('../../models/user.model'); 

class ViewProfileController {
    async viewProfile(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            if (!user || !user.profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            res.status(200).json(user.profile);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ViewProfileController();
