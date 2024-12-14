const mongoose = require('mongoose');

const orderFoodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        
        cook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cook',
        },


        foodItems: [
            {
                name: { type: String, required: true },
                count: { type: Number, required: true },
                price: { type: Number, required: true },
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Food',
                },
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
        },

        orderStatus: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled', 'Confirmed'],
            default: 'Pending',
        },

        address: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },


        lng: {
            type: Number,
            required: true,
        },
        // paymentMethod: {
        //     type: String,
        //     enum: ['Cash', 'Card', 'Online'],
        //     required: true,
        // },
    }, { timestamps: true }
);

const OrderFood = mongoose.model("OrderFood", orderFoodSchema);


module.exports = OrderFood