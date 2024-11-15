const User = require('../../models/user.model.js'); 
const jwt = require('jsonwebtoken');

class LoginController {
    // Method to authenticate a user
    async authenticateUser(req, res) {
        const { id, pw } = req.body;

        try {
            console.log(id);
            console.log(pw);
            const user = await User.login(id,pw);
            res.status(200).json({user});
        
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new LoginController();
