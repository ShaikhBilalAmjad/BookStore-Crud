const express = require('express')
const app = express();
cons = require('consolidate');
const bodyParser = require('body-parser')
const pg = require('pg');

var connect = "postgres://bilalamjad:welcome@localhost/bookstore";

app.use(bodyParser.json());

app.use('/', require('./routes/index'));


module.exports = app;

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});