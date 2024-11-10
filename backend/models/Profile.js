const mongoose = require('mongoose');

// Define the schema for the Profile model
const profileSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    }
}, { 
    collection: 'accounts',  // This ensures the collection name in MongoDB is 'accounts'
    timestamps: true          // Automatically adds createdAt and updatedAt fields
});

// Create and export the Profile model based on the schema
const Profile = mongoose.model('accounts', profileSchema);

module.exports = Profile;
