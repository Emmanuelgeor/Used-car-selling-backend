const Buyer = require('../../models/buyer.model');

class RemoveShortlistedCarController {
    async removeShortlistedCar(req, res) {
        const { buyerId, carId } = req.body;

        try {
            const shortlist = await Buyer.removeShortlistedCar(buyerId, carId);
            res.status(200).json({ message: 'Car removed from shortlist', shortlist });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new RemoveShortlistedCarController();
