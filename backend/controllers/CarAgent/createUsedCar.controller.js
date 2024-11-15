const {createUsedCar} = require('../../models/usedcar.model'); 
const bcrypt = require('bcryptjs');

class CreateUsedCarController {
    async createUsedCar(req, res) {
        const { car_id, make, year, price, spec, photo } = req.body;

        try {
            const usedcar = await createUsedCar(car_id,make, year, price, spec, photo);
            res.status(201).json({usedcar });
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
module.exports = new CreateUsedCarController();
