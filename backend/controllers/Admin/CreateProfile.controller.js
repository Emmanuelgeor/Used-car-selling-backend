const { createProfile } = require('../../models/user.model');

class CreateProfileController {
    async createProfile(req, res) {
        const { id, name, hp, preference, age } = req.body;

        try {
            const user = await createProfile(id, { name, hp, preference, age });
            res.status(201).json({ message: 'Profile added successfully', user });
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

module.exports = new CreateProfileController();
