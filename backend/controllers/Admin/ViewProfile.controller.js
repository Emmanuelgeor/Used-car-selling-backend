const { viewProfile } = require('../../models/user.model');

class viewProfileController {
    async viewProfile(req, res) {

        try {
            // Call the helper function
    
            const user = await viewProfile();

            // Respond with the result
            res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);

            // Handle generic errors
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new viewProfileController();