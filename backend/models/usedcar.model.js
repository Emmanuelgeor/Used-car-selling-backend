const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the UsedCar schema
const usedCarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    spec: { type: String, required: true },
    photo: { type: String, required: true }, // URL or file path for the car's image
    active: { type: Boolean, default: true }, // Indicates if the car is active or suspended
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String },
        },
    ],
    email: { type: String, required: true, unique: true }, // Email for car agent account
    password: { type: String, required: true }, // Hashed password for car agent login
}, { timestamps: true });

// Middleware to hash password before saving
usedCarSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Define static methods for UsedCar management

/**
 * Create a new used car
 */
usedCarSchema.statics.createUsedCar = async function (make, year, price, spec, photo) {
    const car = new this({ make, year, price, spec, photo, active: true });
    return await car.save();
};

/**
 * View a used car by ID
 */
usedCarSchema.statics.viewUsedCar = async function (id) {
    const car = await this.findById(id);
    if (!car) throw new Error('Used car not found');
    return car;
};

/**
 * Update a used car by ID
 */
usedCarSchema.statics.updateUsedCar = async function (id, make, year, price, spec, photo) {
    const updatedFields = { make, year, price, spec, photo };
    const car = await this.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!car) throw new Error('Used car not found');
    return car;
};

/**
 * Suspend a used car by ID
 */
usedCarSchema.statics.suspendUsedCar = async function (id) {
    const car = await this.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!car) throw new Error('Used car not found');
    return car;
};

/**
 * Search for used cars based on filters
 */
usedCarSchema.statics.searchUsedCar = async function (make, year, price, spec) {
    const query = {
        ...(make && { make: { $regex: make, $options: 'i' } }),
        ...(year && { year }),
        ...(price && { price: { $lte: price } }), // Price less than or equal to the provided value
        ...(spec && { spec: { $regex: spec, $options: 'i' } }),
    };
    return await this.find(query);
};

/**
 * View ratings for a specific car
 */
usedCarSchema.statics.viewRatings = async function (id) {
    const car = await this.findById(id);
    if (!car) throw new Error('Used car not found');
    return car.ratings;
};

/**
 * Login for a car agent (email and password)
 */
usedCarSchema.statics.login = async function (email, password) {
    const carAgent = await this.findOne({ email });
    if (!carAgent) throw new Error('Car agent not found');

    const isPasswordValid = await bcrypt.compare(password, carAgent.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    return carAgent; // Return the car agent object if successful
};

/**
 * Logout (Client-Side Token Removal)
 * JWT-based systems typically don't have server-side logout.
 * To add token invalidation, maintain a blacklist or similar mechanism.
 */
usedCarSchema.statics.logout = function () {
    // Logout is handled on the client by removing the JWT token.
    return { message: 'Logged out successfully' };
};

// Define the UsedCar model
const UsedCar = mongoose.model('UsedCar', usedCarSchema);

module.exports = UsedCar;
