const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./user.model');

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

//login........................................................

const login = async (id, pw) => {
    const user = await User.findOne({ id: id });

    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(pw,user.pw);
   
    if (!isPasswordValid) throw new Error('Invalid password');
    if (user.role !== 'Caragent') {
        throw new Error('You selected wrong role');
    }

    // Return the user if all checks pass
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
        throw new Error('car already exists');
    }
    const newUsedcar = new UsedCar({ car_id, make, year, price, spec, photo});
    await newUsedcar.save();

    return newUsedcar;
};
// Update used car..........................................................
const updateUsedCar = async (car_id,{ make, year, price, spec, photo }) => {
    // Find the user by their ID
    const usedcar = await UsedCar.findOne({car_id});
    if (!usedcar) {
        throw new Error('car not found');
    }
    // Update user fields if provided
    if (make) usedcar.make = make;
    if (year) usedcar.year = year;
    if (price) usedcar.price = price;
    if (spec) usedcar.spec = spec;
    if (photo) usedcar.photo = photo;
    // Save the updated user
    await usedcar.save();

    return usedcar;
};

//Search usedcar...............................................................
const searchUsedCar = async (car_id) => {
    // Find the user by their ID
    const usedcar = await UsedCar.findOne(car_id);
    if (!usedcar) {
        throw new Error('Account not found');
    }
    return usedcar;
};

//Suspend usedcar..................................................................
const suspendUsedCar = async (car_id) => {
    // Find the car by ID using findOne
    const usedcar = await UsedCar.findOne(car_id );
    if (!usedcar) {
        throw new Error('Car not found');
    }
    // Set the `active` field to false to suspend the user
    usedcar.active = false;
    // Save the updated user
    await usedcar.save();
    return usedcar;
};

//View usedcar.............................................................................

const viewUsedCar = async () => {
    const usedcars = await User.find({}, { rating: 0 }); 
    if (!usedcars || usedcars.length === 0) {
        throw new Error('No users found');
    }

    return usedcars;
};

//view ratings................................................................................
const viewRating = async () => {
    const usedcar = await UsedCar.find({}, { ratings: 1, _id: 0 });
    if (!usedcar || usedcar.length === 0) {
        throw new Error('No ratings');
    }

    return usedcar;
};



module.exports = { UsedCar,login,createUsedCar,updateUsedCar,searchUsedCar,suspendUsedCar,viewUsedCar,viewRating};
