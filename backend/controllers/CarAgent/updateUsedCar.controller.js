const UsedCar = require('../../models/usedcar.model');

class UpdateUsedCarController {
    async updateUsedCar(req, res) {
        const { id, make, year, price, spec, photo } = req.body;

        try {
            const car = await UsedCar.updateUsedCar(id, make, year, price, spec, photo);
            res.status(200).json({ message: 'Used car updated successfully', car });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new UpdateUsedCarController();
