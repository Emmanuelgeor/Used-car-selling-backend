const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { searchprofile } = require('../controllers/Admin/SearchProfile.controller');

// Define the User schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },email: {
        type: String,
        required: true,
        unique: true,
    },
    pw: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    name: {
        type: String,
        
    },
    hp: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    profiles: [
        {
            name: { type: String, required: true },
            hp: { type: Number, required: true },
            preference: { type: String, required: true },
            age: { type: Number, required: true },
            active: { type: Boolean, default: true },
        },
    ],
});

// login..............................................
const User = mongoose.model('User', userSchema);

const login = async (id, pw) => {
    const user = await User.findOne({ id: id });

    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(pw,user.pw);
   
    if (!isPasswordValid) throw new Error('Invalid password');
   
    return user;
};

// create a user.........................
const createUser = async (id, pw, email, role) => {
    const existingUser = await User.findOne({ id});
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedpw = await bcrypt.hash(pw, 10);
    const newUser = new User({ id, email, role, pw: hashedpw });    
    await newUser.save();

    return newUser;
};

// Search account............................
const searchAccount = async (id) => {
    // Find the user by their ID
    const user = await User.findOne(id);
    if (!user) {
        throw new Error('Account not found');
    }


    return user;
};


//Update Account.......................
const updateAccount = async (id,{ email, pw, role }) => {
    // Find the user by their ID
    const user = await User.findOne({id});
    if (!user) {
        throw new Error('User not found');
    }
    // Update user fields if provided
    if (email) user.email = email;
    if (pw) {
        user.pw = await bcrypt.hash(pw, 10); // Hash the new password
    }
    if (role) user.role = role;
    // Save the updated user
    await user.save();

    return user;
};


//View Account............................
const viewAccount = async () => {
    // Exclude the `profiles` field
    const users = await User.find({}, { profiles: 0 }); // Exclude `profiles` field
    if (!users || users.length === 0) {
        throw new Error('No users found');
    }

    return users;
};


//Suspend user...............................
const suspendAccount = async (id) => {
    // Find the user by ID using findOne
    const user = await User.findOne( {id });

    if (!user) {
        throw new Error('Account not found');
    }

    // Set the `active` field to false to suspend the user
    user.active = false;

    // Save the updated user
    await user.save();

    return user;
};

//create profile...............................................

const createProfile = async (id, profileData) => {
    const { name, hp, preference, age } = profileData;

    const user = await User.findOne(id ); // Match by custom `id`

    if (!user) {
        throw new Error('User not found');
    }
    user.profiles.push({ name, hp, preference, age, active: true });

    // Save the updated user
    await user.save();

    return user;
};

//Update profile...................................................
const updateProfile = async (id, { name, hp, preference, age }) => {
    // Find the user by their ID
    const user = await User.findOne(id);
    if (!user) {
        throw new Error('User not found');
    }
    // Access the first (and only) profile
    const profile = user.profiles[0];
    // Update profile fields if provided
    if (name) profile.name = name;
    if (hp) profile.hp = hp;
    if (preference) profile.preference = preference;
    if (age) profile.age = age;
    // Save the updated user
    await user.save();
    return user;
};

//view profile............................................................

const viewProfile = async () => {
    // Fetch only the `profiles` field
    const users = await User.find({}, { profiles: 1, _id: 0 }); // Include only `profiles`, exclude `_id`
    if (!users || users.length === 0) {
        throw new Error('No users found');
    }

    return users;
};

//Suspend profile..........................................................

const suspendProfile = async (name) => {
    // Find the user by their `name`
    const user = await User.findOne({name});

    if (!user) {
        throw new Error("User with the specified name not found");
    }

    const profile = user.profiles[0];
    // Update the profile's active status
    profile.active = false;

    // Save the updated user document
    await user.save();

    // Return the updated profile
    return profile;
};
//Sesrch profile............................................................

const searchProfile = async (name) => {
const user = await User.findOne({name});
    // Return the updated profile
     const profile = user.profiles[0];
    return profile;
};

//logout.....................................................................
// ProcessLogoutController.js

const processLogout = (req) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
};







  
module.exports = { User,updateAccount,createProfile,createUser,updateAccount,updateProfile,viewAccount,viewProfile,suspendAccount,suspendProfile,searchAccount,searchProfile,login,processLogout};

