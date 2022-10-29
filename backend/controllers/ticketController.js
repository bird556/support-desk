const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { create } = require('../models/ticketModel');

const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
// @Desc   Get user Tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @Desc   CreateTickets
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
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
});

module.exports = {
  getTickets,
  createTicket,
};
