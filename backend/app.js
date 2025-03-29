const express = require('express');
const morgan = require('morgan');
const app = express();

const connect = require('./db/db');
connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send("Hello");
})

module.exports = app;