const { viewAccount } = require('../../models/user.model');

class ViewAccController {
    async viewAccount(req, res) {
        const { id } = req.query; 

        try {
            // Call the helper function
    
            const user = await viewAccount(id);

            // Respond with the result
            res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);

            // Handle generic errors
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ViewAccController();
