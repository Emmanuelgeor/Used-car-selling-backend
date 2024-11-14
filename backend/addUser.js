const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {User} = require('./models/user.model'); // Adjust path

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://emmanualgeorge99:12345678123@cluster1.ujldw.mongodb.net/csit314?retryWrites=true&w=majority';

const addAdminUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        mongoose.set('debug', true); // Enable debugging

        // Define admin users
        const adminUsers = [
            {
                id: 'adminUser111',
                email: 'admin1@example.com',
                pw: 'AdminPassword1',
                role: 'admin',
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
                id: 'adminUser2111',
                email: 'admin2@example.com',
                pw: 'AdminPassword2',
                role: 'admin',
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
                console.log(`User with ID "${adminUser._id}" already exists.`);
                continue;
            }

            try {
                const hashedPassword = await bcrypt.hash(adminUser.pw, 10);

                const newUser = new User({
                    id: adminUser.id,
                    email: adminUser.email,
                    pw: hashedPassword,
                    role: adminUser.role,
                    name: adminUser.name,
                    hp: adminUser.hp,
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
