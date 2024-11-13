const UsedCar = require('../../models/usedcar.model');

class ViewRatingsController {
    async viewRatings(req, res) {
        const { id } = req.params;

        try {
            const ratings = await UsedCar.viewRatings(id);
            res.status(200).json(ratings);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ViewRatingsController();
