/**
 * This module connects rendering modules to routes
 */

const express = require('express')
const app = express();

app.use('/users', require('./users'));
app.use('/authors', require('./authors'));
app.use('/books', require('./books'));

module.exports = app