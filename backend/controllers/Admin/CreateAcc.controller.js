const {createUser} = require('../../models/user.model'); 
const bcrypt = require('bcryptjs');

class CreateAccController {
    async createUser(req, res) {
        const { id, pw, email, role } = req.body;

        try {
            
            const user = await createUser(id, pw, email, role)

            res.status(201).json({ message: 'Account created successfully',user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CreateAccController();
