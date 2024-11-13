const UsedCar = require('../../models/usedcar.model');

class SearchUsedCarController {
    async searchUsedCar(req, res) {
        const { make, year, price, spec } = req.query;

        try {
            const cars = await UsedCar.searchUsedCar(make, year, price, spec);
            res.status(200).json(cars);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new SearchUsedCarController();
