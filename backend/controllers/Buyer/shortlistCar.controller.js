const Buyer = require('../../models/buyer.model');

class ShortlistCarController {
    async shortlistCar(req, res) {
        const { buyerId, carId } = req.body;

        try {
            const shortlist = await Buyer.shortlistCar(buyerId, carId);
            res.status(200).json({ message: 'Car shortlisted successfully', shortlist });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ShortlistCarController();
