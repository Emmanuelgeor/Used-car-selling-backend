const Buyer = require('../../models/buyer.model');

class ValidateShortlistedCarController {
    async validateShortlistedCar(req, res) {
        const { buyerId, carId } = req.params;

        try {
            const car = await Buyer.validateShortlistedCar(buyerId, carId);
            res.status(200).json(car);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ValidateShortlistedCarController();
