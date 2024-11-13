const Buyer = require('../../models/buyer.model');

class RateAgentController {
    async rateAgent(req, res) {
        const { buyerId, agentId, rating, review } = req.body;

        try {
            const ratings = await Buyer.rateAgent(buyerId, agentId, rating, review);
            res.status(200).json({ message: 'Agent rated successfully', ratings });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new RateAgentController();
