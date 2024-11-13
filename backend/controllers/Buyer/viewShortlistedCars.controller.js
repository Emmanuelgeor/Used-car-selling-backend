const Buyer = require('../../models/buyer.model');

class ViewShortlistedCarsController {
    async viewShortlistedCars(req, res) {
        const { buyerId } = req.params;

        try {
            const shortlist = await Buyer.viewShortlistedCars(buyerId);
            res.status(200).json(shortlist);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ViewShortlistedCarsController();
