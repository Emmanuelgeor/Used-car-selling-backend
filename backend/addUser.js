require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserAcc = require('./entity/RoleEntities'); // Adjust path if needed

const addAdmins = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // List of admin users to create
        const admins = [
            {
                id: 1001,
                username: 'admin1',
                password: await bcrypt.hash('password1', 10),
                role: 'admin'
            },
            {
                id: 1002,
                username: 'admin2',
                password: await bcrypt.hash('password2', 10),
                role: 'admin'
            }
        ];

        // Iterate over the admin list and create each one
        for (const adminData of admins) {
            const existingUser = await UserAcc.findOne({ username: adminData.username });
            if (existingUser) {
                console.log(`User with username "${adminData.username}" already exists.`);
            } else {
                const newAdmin = new UserAcc(adminData);
                await newAdmin.save();
                console.log(`Admin "${adminData.username}" added successfully.`);
            }
        }

        // Disconnect from the database
        mongoose.disconnect();
    } catch (error) {
        console.error('Error adding admins:', error);
        mongoose.disconnect();
    }
};

// Run the script
addAdmins();