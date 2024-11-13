const User = require('../../models/user.model'); 

class SuspendAccController {
    async suspendAccount(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findByIdAndUpdate(id, { suspended: true }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'Account not found' });
            }

            res.status(200).json({ message: 'Account suspended successfully', user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SuspendAccController();
