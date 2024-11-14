const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Define the User model
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
    const existingUser = await User.findOne({ email });
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
    const user = await User.findOne( id );

    if (!user) {
        throw new Error('Account not found');
    }

    // Set the `active` field to false to suspend the user
    user.active = false;

    // Save the updated user
    await user.save();

    return user;
};

  
module.exports = { User, login, createUser, searchAccount,updateAccount,viewAccount,suspendAccount};

