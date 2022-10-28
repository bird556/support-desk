const express = require('express');
const router = express.Router();
const { getTickets, createTicket } = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

// router.post('/', registerUser);
// router.post('/login', loginUser);
// router.get('/me', protect, getMe);
router.route('/').get(protect, getTickets).post(protect, createTicket);

module.exports = router;
