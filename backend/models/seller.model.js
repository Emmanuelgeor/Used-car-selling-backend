const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sellerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Seller's email for login
    pw: { type: String, required: true }, // Hashed pw
    cars: [
        {
            carId: { type: mongoose.Schema.Types.ObjectId, ref: 'UsedCar', required: true },
            views: { type: Number, default: 0 }, // Tracks the number of views
            shortlistedCount: { type: Number, default: 0 }, // Tracks how many times the car has been shortlisted
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

// Pre-save middleware to hash pws
sellerSchema.pre('save', async function (next) {
    if (this.isModified('pw')) {
        this.pw = await bcrypt.hash(this.pw, 10);
    }
    next();
});

// Seller Login
sellerSchema.statics.login = async function (email, pw) {
    const seller = await this.findOne({ email });
    if (!seller) throw new Error('Seller not found');

    const ispwValid = await bcrypt.compare(pw, seller.pw);
    if (!ispwValid) throw new Error('Invalid credentials');

    return seller;
};

// Track views for a car listing
sellerSchema.statics.trackViews = async function (sellerId, carId) {
    const seller = await this.findById(sellerId);
    if (!seller) throw new Error('Seller not found');

    const car = seller.cars.find((item) => item.carId.toString() === carId);
    if (!car) throw new Error('Car listing not found');

    return { carId, views: car.views };
};

// Track shortlists for a car listing
sellerSchema.statics.trackShortlist = async function (sellerId, carId) {
    const seller = await this.findById(sellerId);
    if (!seller) throw new Error('Seller not found');

    const car = seller.cars.find((item) => item.carId.toString() === carId);
    if (!car) throw new Error('Car listing not found');

    return { carId, shortlistedCount: car.shortlistedCount };
};

// Rate a Car Agent
sellerSchema.statics.rateAgent = async function (sellerId, agentId, rating, review) {
    const seller = await this.findById(sellerId);
    if (!seller) throw new Error('Seller not found');

    seller.ratings.push({ agentId, rating, review });
    await seller.save();

    return seller.ratings;
};

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
