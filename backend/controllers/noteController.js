const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const Note = require('../models/noteModel');

// @Desc   Get notes for a Ticket
// @route  GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @Desc   Create Note
// @route  POST /api/tickets/:ticketId/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
    name: req.user.name,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  createNote,
};
