const { viewUsedCar } = require('../../models/usedcar.model');

class ViewUsedCarController {
    async viewUsedCar(req, res) {
        const { car_id } = req.query; 

        try {
            // Call the helper function
    
            const user = await viewUsedCar(car_id);

            // Respond with the result
            res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);

            // Handle generic errors
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
module.exports = new ViewUsedCarController();
