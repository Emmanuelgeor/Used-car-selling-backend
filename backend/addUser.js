const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model'); // Adjust path

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://emmanualgeorge99:1234567890@cluster0.s7ea1.mongodb.net/csit314?retryWrites=true&w=majority';

const addAdminUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        mongoose.set('debug', true); // Enable debugging

        // Define admin users
        const adminUsers = [
            {
                id: 'adminUser1',
                email: 'admin1@example.com',
                password: 'AdminPassword1',
                role: 'admin',
                name: 'Admin One',
                phone_number: '987-654-3210',
                address: '456 Admin Blvd',
                profiles: [
                    {
                        name: 'Admin One',
                        hp: 120,
                        preference: 'Strategy',
                        age: 40,
                        active: true,
                    },
                ],
            },
            {
                id: 'adminUser3',
                email: 'admin2@example.com',
                password: 'AdminPassword2',
                role: 'admin',
                name: 'Admin Three',
                phone_number: '456-789-0123',
                address: '789 Admin Lane',
                profiles: [
                    {
                        name: 'Admin Two',
                        hp: 110,
                        preference: 'Leadership',
                        age: 35,
                        active: true,
                    },
                ],
            },
        ];

        for (const adminUser of adminUsers) {
            const existingUser = await User.findOne({ id: adminUser.id });

            if (existingUser) {
                console.log(`User with ID "${adminUser.id}" already exists.`);
                continue;
            }

            try {
                const hashedPassword = await bcrypt.hash(adminUser.password, 10);

                const newUser = new User({
                    id: adminUser.id,
                    email: adminUser.email,
                    password: hashedPassword,
                    role: adminUser.role,
                    name: adminUser.name,
                    phone_number: adminUser.phone_number,
                    address: adminUser.address,
                    profiles: adminUser.profiles,
                });

                await newUser.save();
                console.log(`Admin user "${adminUser.name}" added successfully.`);
            } catch (err) {
                console.error(`Error saving user "${adminUser.name}":`, err.message);
            }
        }
    } catch (error) {
        console.error('Error adding admin users:', error.message);
    } finally {
        mongoose.connection.close();
        console.log('Connection closed.');
    }
};

// Run the function
addAdminUsers();
