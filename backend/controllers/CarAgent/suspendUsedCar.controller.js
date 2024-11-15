const { suspendUsedCar } = require('../../models/usedcar.model');

class SuspendUsedCarController {
    async suspendUsedCar(req, res) {
        const {car_id} = req.params; 

        try {
            // Suspend the user by calling the helper function
            const usedcar = await suspendUsedCar(car_id);
          res.status(200).json(usedcar);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

module.exports = new SuspendUsedCarController();
