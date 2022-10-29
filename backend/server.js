const express = require('express');

const colors = require('colors');

const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');

// Connect to database
connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

app.get('/', (req, res) => {
  res.json({ message: 'Hello Postman' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
// Routes
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);
