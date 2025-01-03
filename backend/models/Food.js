// models/food.js
const mongoose = require('mongoose');

// Create a food schema
const foodSchema = new mongoose.Schema({
    cook: {
        type: mongoose.Schema.ObjectId,
        ref: 'Cook',
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    },

    cookName: {
        type: String,
        required: true,
        trim: true,
    },


    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert'],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    cookDate: [{
        type: String,
        required: true,
    }],
    cookHour: {
        type: String,
        required: true,
    },
    photo: String,
    photos: [
        {
            type: String
        }
    ],
}, { timestamps: true });

// Export the model
const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
