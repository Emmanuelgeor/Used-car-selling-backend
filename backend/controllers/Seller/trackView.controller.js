const Seller = require('../../models/seller.model');

class TrackViewController {
    async trackViews(req, res) {
        const { sellerId, carId } = req.params;

        try {
            const views = await Seller.trackViews(sellerId, carId);
            res.status(200).json(views);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TrackViewController();
