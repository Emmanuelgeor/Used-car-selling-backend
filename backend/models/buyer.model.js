const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./user.model');

const buyerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    pw: { type: String, required: true },
    shortlist: [
        {
            carId: { type: mongoose.Schema.Types.ObjectId, ref: 'UsedCar', required: true },
            addedAt: { type: Date, default: Date.now },
        },
    ],
    ratings: [
        {
            agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CarAgent', required: true },
            rating: { type: Number, min: 1, max: 5, required: true },
            review: { type: String },
            ratedAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });



//login..................................................


const login = async (id, pw) => {
    const user = await User.findOne({ id: id });

    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(pw,user.pw);
   
    if (!isPasswordValid) throw new Error('Invalid password');
    if (user.role !== 'Buyer') {
        throw new Error('Access denied: Admin role required');
    }
    // Return the user if all checks pass
    return user;
};

// Add a car to shortlist
buyerSchema.statics.shortlistCar = async function (buyerId, carId) {
    const buyer = await this.findById(buyerId);
    if (!buyer) throw new Error('Buyer not found');

    if (buyer.shortlist.some((item) => item.carId.toString() === carId)) {
        throw new Error('Car already shortlisted');
    }

    buyer.shortlist.push({ carId });
    await buyer.save();
    return buyer.shortlist;
};

// View buyer's shortlisted cars
buyerSchema.statics.viewShortlistedCars = async function (buyerId) {
    const buyer = await this.findById(buyerId).populate('shortlist.carId');
    if (!buyer) throw new Error('Buyer not found');

    return buyer.shortlist;
};

// Calculate Loan Payments for a Used Car
buyerSchema.statics.calculateLoan = async function (carId, loanTermYears, interestRate) {
    const car = await mongoose.model('UsedCar').findById(carId);
    if (!car) throw new Error('Car not found');

    const principal = car.price;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTermYears * 12;

    const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalMonths));

    return {
        principal,
        loanTermYears,
        interestRate,
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: (monthlyPayment * totalMonths).toFixed(2),
    };
};

// Rate a Car Agent
buyerSchema.statics.rateAgent = async function (buyerId, agentId, rating, review) {
    const buyer = await this.findById(buyerId);
    if (!buyer) throw new Error('Buyer not found');

    buyer.ratings.push({ agentId, rating, review });
    await buyer.save();

    return buyer.ratings;
};

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = login;
