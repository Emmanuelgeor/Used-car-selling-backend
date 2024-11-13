const UsedCar = require('../../models/usedcar.model');

class ViewUsedCarController {
    async viewUsedCar(req, res) {
        const { id } = req.params;

        try {
            const car = await UsedCar.viewUsedCar(id);
            res.status(200).json(car);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ViewUsedCarController();
