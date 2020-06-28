const express = require('express');
const app = express();

// this piece of code using https://stackoverflow.com/questions/55127223/pendingitem-callback-is-not-a-function
// and youtube totrials follow are https://www.youtube.com/watch?v=ijSzX3S5Qco&list=PLillGF-RfqbaEmlPcX5e_ejaK7Y5MydkW&index=3
cons = require('consolidate');
var connect = "postgres://bilalamjad:welcome@localhost/bookstore";

const {Pool} = require("pg");
const pool = new Pool({
  connectionString: connect,
})


app.get('/', (req, res,next) => {
  pool.connect(function(err,client,done){
    if(err){
      console.error('error fetching client pool',err);
      res.status(400).send(err);
    }
    client.query('SELECT * from books ',function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send(result.rows);
      done();
    })
  })
});

//  getting all data
app.get('/:id', (req, res) => {
    pool.connect(function(err,client,done){
      if(err){
        console.error('error fetching client pool',err);
        res.status(400).send(err);
      }
      client.query('SELECT * from books WHERE id = $1',[req.params.id],function(err, result){
        if(err){
          return console.error('error running query',err);
        }
        res.status(200).send(result.rows);
        done();
      })
    })
});
app.post('/add', (req, res) => {
  pool.connect(function(err,client,done){
    if(err){
      console.error('error fetching client pool',err);
      res.status(400).send(err);
    }
    client.query('INSERT INTO books (book_name, description, author_id) VALUES ($1, $2, $3);',[req.body.name,req.body.description,req.body.author_id],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('Book with name '+req.body.name+' & description '+req.body.description+' added Successfully against author_id'+req.body.author_id);
      done();
    })
  })
});
app.put('/put/:id', (req, res) => {
  pool.connect(function(err,client,done){
    if(err){
      console.error('error fetching client pool',err);
      res.status(400).send(err);
    }
    client.query('UPDATE books SET book_name = $1, description = $2,author_id= $3 where id= $4',[req.body.name,req.body.description,req.body.author_id,req.params.id],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('book has been updated successfully');
      done();
    })
  })
});
app.delete('/delete/:id', (req, res) => {
  pool.connect(function(err,client,done){
    if(err){
      console.error('error fetching client pool',err);
      res.status(400).send(err);
    }
    client.query('DELETE from books where id= $1',[req.params.id],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('Book has been deleted successfully');
      done();
    })
  })
});

module.exports = app