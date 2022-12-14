const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

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

// @Desc   Get single user Ticket
// @route  GET /api/tickets/:id
// @access Private
const getSingleTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }
  res.status(200).json(ticket);
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
    name: req.user.name,
    status: 'new',
  });

  res.status(201).json(createTicket);
});

// @Desc   Delete single user Ticket
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @Desc   Update Ticket
// @route  PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getSingleTicket,
  deleteTicket,
  updateTicket,
};
