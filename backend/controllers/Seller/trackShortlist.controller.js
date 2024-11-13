const Seller = require('../../models/seller.model');

class TrackShortlistController {
    async trackShortlist(req, res) {
        const { sellerId, carId } = req.params;

        try {
            const shortlisted = await Seller.trackShortlist(sellerId, carId);
            res.status(200).json(shortlisted);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TrackShortlistController();
