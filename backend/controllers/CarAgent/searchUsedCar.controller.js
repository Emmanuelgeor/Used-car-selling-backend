const { searchUsedCar } = require('../../models/usedcar.model');
class SearchUsedCarController {
    async searchUsedCar(req, res) {
        const car_id  = req.query;

        try {
            // Call the searchAccount function
            const usedcar = await searchUsedCar(car_id);
            res.status(200).json(usedcar);
        } catch (error) {
            console.error('Error:', error);

            // Check for specific error messages
        }
    }
}
module.exports = new SearchUsedCarController();
