const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a Product'],
<<<<<<< HEAD
      enum: ['Alienware', 'iMac', 'ASUS', 'MacBook', 'iPhone', 'Samsung'],
=======
      enum: ['Alienware', 'iMac', 'ASUS', 'MacBook'],
>>>>>>> c474611bc1c0a8934494afd536e4ceb7112a2a7e
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
