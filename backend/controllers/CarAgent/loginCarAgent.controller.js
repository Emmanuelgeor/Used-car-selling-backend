const jwt = require('jsonwebtoken');
const User = require('../../models/usedcar.model');

class LoginCarAgentController {    
       // Method to authenticate a user
        async authenticateUser1(req, res) {
            const { id, pw } = req.body;
    
            try {
                const user = await User.login(id,pw);
                res.status(200).json({user});
            
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ message: error.message });
            }
        }
    }
    
module.exports = new LoginCarAgentController();
