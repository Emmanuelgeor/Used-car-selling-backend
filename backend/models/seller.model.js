const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sellerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Seller's email for login
    password: { type: String, required: true }, // Hashed password
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

// Pre-save middleware to hash passwords
sellerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Seller Login
sellerSchema.statics.login = async function (email, password) {
    const seller = await this.findOne({ email });
    if (!seller) throw new Error('Seller not found');

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

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
