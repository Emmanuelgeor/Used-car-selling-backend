const UsedCar = require('../../models/usedcar.model');

class CreateUsedCarController {
    async createUsedCar(req, res) {
        const { make, year, price, spec, photo } = req.body;

        try {
            const car = await UsedCar.createUsedCar(make, year, price, spec, photo);
            res.status(201).json({ message: 'Used car created successfully', car });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new CreateUsedCarController();
