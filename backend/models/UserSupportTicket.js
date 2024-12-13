const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Support Ticket schema
const userSupportTicketSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  isRead: {
    type: Boolean,
    default: false
  }
});

// Middleware to update the `updatedAt` field on save
userSupportTicketSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Support Ticket model
const UserSupportTicket = mongoose.model('UserSupportTicket', userSupportTicketSchema);

module.exports = UserSupportTicket;