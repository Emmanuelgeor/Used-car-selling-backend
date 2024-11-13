const Buyer = require('../../models/buyer.model');

class LoanCalculatorController {
    async calculateLoan(req, res) {
        const { carId, loanTermYears, interestRate } = req.body;

        try {
            const loanDetails = await Buyer.calculateLoan(carId, loanTermYears, interestRate);
            res.status(200).json(loanDetails);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new LoanCalculatorController();
