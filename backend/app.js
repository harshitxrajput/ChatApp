const express = require('express');
const app = express();

//external packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//routes
const userRoutes = require('./routes/user.routes')

//database connection
const connect = require('./db/db');
connect();

app.use(cors());
app.use(cookieParser())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

module.exports = app;