const {createUsedCar} = require('../../models/usedcar.model'); 
const bcrypt = require('bcryptjs');

class CreateUsedCarController {
    async createUsedCare(req, res) {
        const { car_id, make, year, price, spec, photo } = req.body;

        try {
            const car = await createUsedCar(car_id,make, year, price, spec, photo);
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
module.exports = new CreateUsedCarController();
