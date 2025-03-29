const express = require('express');
const morgan = require('morgan');
const app = express();

const userRoutes = require('./routes/user.routes')

const connect = require('./db/db');
connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

module.exports = app;