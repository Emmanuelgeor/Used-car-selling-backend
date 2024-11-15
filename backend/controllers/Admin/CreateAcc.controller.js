const {createUser} = require('../../models/user.model'); 
const bcrypt = require('bcryptjs');

class CreateAccController {
    async createUser(req, res) {
        const { id, pw, email, role } = req.body;

        try {
            
            const user = await createUser(id, pw, email, role)

            res.status(201).json({user });
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

module.exports = new CreateAccController();
