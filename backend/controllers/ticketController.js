const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticketModel');

// @Desc   Get user Tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'getTickets' });
});

// @Desc   CreateTickets
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'createTicket' });
});

module.exports = {
  getTickets,
  createTicket,
};
