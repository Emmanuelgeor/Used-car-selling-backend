const {updateProfile} = require('../../models/user.model'); 
class UpdateProfileController {
    async updateProfile(req, res) {
        const { id, name, hp, preference, age } = req.body;

        try {
            const user = await updateProfile(id, { name, hp, preference, age });
            res.status(200).json({ user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UpdateProfileController();
