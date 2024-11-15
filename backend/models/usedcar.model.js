const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the UsedCar schema
const usedCarSchema = new mongoose.Schema({
    car_id: {
        type: String,
        required: true,
        unique: true,
    },
    make: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    spec: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true, // URL or file path for the car's image
    },
    active: {
        type: Boolean,
        default: true, 
    },
    ratings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            comment: {
                type: String,
            },
        },
    ],
});

const UsedCar = mongoose.model('UsedCar', usedCarSchema);



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

//login........................................................

const login = async (id, pw) => {
    const user = await UsedCar.findOne({ id: id });

    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(pw,user.pw);
   
    if (!isPasswordValid) throw new Error('Invalid password');
   
    return user;
};
//Logout..........................................................

usedCarSchema.statics.logout = function () {
    // Logout is handled on the client by removing the JWT token.
    return { message: 'Logged out successfully' };
};

 //Create a new used car.................................................

const createUsedCar = async (car_id, make, year, price, spec, photo)=> {
    const existingUser = await UsedCar.findOne({car_id});
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedpw = await bcrypt.hash(pw, 10);
    const newcar = new UsedCar({ car_id, make, year, price, spec, photo});
    await newUsedcar.save();

    return newUsedcar;
};


module.exports = { UsedCar,login,createUsedCar};
