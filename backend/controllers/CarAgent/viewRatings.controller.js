const {viewRating } = require('../../models/usedcar.model');

class viewRatingsController {
    async viewRating(req, res) {

        try {
   
            const usedcar = await viewRating();

            // Respond with the result
            res.status(200).json(usedcar);
        } catch (error) {
            console.error('Error:', error);

        }
    }
}

module.exports = new viewRatingsController();
