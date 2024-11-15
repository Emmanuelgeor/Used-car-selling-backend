const {updateUsedCar} = require('../../models/usedcar.model');

class updateUsedCarController {
    async updateUsedCar(req, res) {
        const {car_id }= req.query;
        const {make, year, price, spec, photo  } = req.body;

        try {
            const usedcar = await updateUsedCar(car_id, { car_id, make, year, price, spec, photo });

            // Respond with the updated user details
            res.status(200).json(usedcar);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: error.message });
        }
    }
}
      module.exports = new updateUsedCarController();