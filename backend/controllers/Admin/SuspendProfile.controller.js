const { suspendProfile } = require('../../models/user.model');

class SuspendProfileController {
    async suspendProfile(req, res) {
        const {name} = req.params;

        try {
            const profile = await suspendProfile(name);
            res.status(200).json(profile);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new SuspendProfileController();
