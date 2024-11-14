
const { updateAccount } = require('../../models/user.model');

class UpdateAccController {
    async updateAccount(req, res) {
        const {id }= req.query;
        const { email, pw, role } = req.body;

        try {
            // Call the helper function to search and update the user
            const user = await updateAccount(id, { email, pw, role });

            // Respond with the updated user details
            res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UpdateAccController();
