const { suspendAccount } = require('../../models/user.model');

class SuspendAccController {
    async suspendAccount(req, res) {
        const { id } = req.params; 

        try {
            // Suspend the user by calling the helper function
            const user = await suspendAccount(id);
          res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);

            // Handle generic errors
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SuspendAccController();
