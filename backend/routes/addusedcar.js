const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {UsedCar} = require('../models/usedcar.model'); // Adjust path

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://emmanualgeorge99:12345678123@cluster1.ujldw.mongodb.net/csit314?retryWrites=true&w=majority';

const addAdminUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        mongoose.set('debug', true); // Enable debugging

        // Define admin users
        const usedCars = [
            {
              "car_id": "CAR001",
              "make": "Toyota",
              "year": 2018,
              "price": 15000,
              "spec": "Automatic, 1.5L Engine, Hybrid",
              "photo": "https://example.com/photos/toyota_2018.jpg",
              "active": true,
              "ratings": [
                {
                  "userId": "643e9b1c7e0a9d5f8b123abc",
                  "rating": 5,
                  "comment": "Excellent car, very fuel efficient!"
                },
                {
                  "userId": "643e9b1c7e0a9d5f8b123def",
                  "rating": 4,
                  "comment": "Smooth drive but a bit noisy."
                }
              ]
            },
            {
              "car_id": "CAR002",
              "make": "Honda",
              "year": 2020,
              "price": 18000,
              "spec": "Manual, 1.8L Engine, Gasoline",
              "photo": "https://example.com/photos/honda_2020.jpg",
              "active": true,
              "ratings": [
                {
                  "userId": "643e9b1c7e0a9d5f8b456abc",
                  "rating": 4,
                  "comment": "Good performance and affordable price."
                }
              ]
            },
            {
              "car_id": "CAR003",
              "make": "Ford",
              "year": 2017,
              "price": 12000,
              "spec": "Automatic, 2.0L Engine, Diesel",
              "photo": "https://example.com/photos/ford_2017.jpg",
              "active": false,
              "ratings": []
            },
            {
              "car_id": "CAR004",
              "make": "BMW",
              "year": 2021,
              "price": 30000,
              "spec": "Automatic, 3.0L Engine, Electric",
              "photo": "https://example.com/photos/bmw_2021.jpg",
              "active": true,
              "ratings": [
                {
                  "userId": "643e9b1c7e0a9d5f8b789abc",
                  "rating": 5,
                  "comment": "Luxurious and super smooth!"
                },
                {
                  "userId": "643e9b1c7e0a9d5f8b101abc",
                  "rating": 4,
                  "comment": "High maintenance cost but worth it."
                }
              ]
            },
            {
              "car_id": "CAR005",
              "make": "Nissan",
              "year": 2019,
              "price": 16000,
              "spec": "Automatic, 1.6L Engine, Gasoline",
              "photo": "https://example.com/photos/nissan_2019.jpg",
              "active": true,
              "ratings": [
                {
                  "userId": "643e9b1c7e0a9d5f8b111abc",
                  "rating": 3,
                  "comment": "Decent car but lacks modern features."
                }
              ]
            }
          ]
          

        for (const usedCar of usedCars) {
            const existingCar = await UsedCar.findOne({ car_id: usedCar.id });

            if (existingUser) {
                console.log(`User with ID "${usedCar._id}" already exists.`);
                continue;
            }

            try {
                

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
