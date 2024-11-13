const Seller = require('../../models/seller.model');

class RateAgentController {
    async rateAgent(req, res) {
        const { sellerId, agentId, rating, review } = req.body;

        try {
            const ratings = await Seller.rateAgent(sellerId, agentId, rating, review);
            res.status(200).json({ message: 'Agent rated successfully', ratings });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new RateAgentController();
