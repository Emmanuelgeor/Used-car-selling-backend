const UsedCar = require('../../models/usedcar.model');

class SuspendUsedCarController {
    async suspendUsedCar(req, res) {
        const { id } = req.params;

        try {
            const car = await UsedCar.suspendUsedCar(id);
            res.status(200).json({ message: 'Used car suspended successfully', car });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SuspendUsedCarController();
