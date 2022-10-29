const asyncHandler = require('express-async-handler');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const { create } = require('../models/ticketModel');

const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
=======

const Ticket = require('../models/ticketModel');

>>>>>>> c474611bc1c0a8934494afd536e4ceb7112a2a7e
// @Desc   Get user Tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
=======
  res.status(200).json({ message: 'getTickets' });
>>>>>>> c474611bc1c0a8934494afd536e4ceb7112a2a7e
});

// @Desc   CreateTickets
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product & description');
  }

  const createTicket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(createTicket);
=======
  res.status(200).json({ message: 'createTicket' });
>>>>>>> c474611bc1c0a8934494afd536e4ceb7112a2a7e
});

module.exports = {
  getTickets,
  createTicket,
};
