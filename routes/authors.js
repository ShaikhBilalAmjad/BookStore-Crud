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
    client.query('SELECT * from authors ',function(err, result){
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
      client.query('SELECT * from authors WHERE author_id = $1',[req.params.id],function(err, result){
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
    client.query('INSERT INTO authors (author_name, age) VALUES ($1, $2);',[req.body.name,req.body.age],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('author with name '+req.body.name+' & age '+req.body.age+' added Successfully');
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
    client.query('UPDATE authors SET author_name = $1, age = $2 where author_id= $3',[req.body.name,req.body.age,req.params.id],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('Author has been updated successfully');
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
    client.query('DELETE from authors where author_id= $1',[req.params.id],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('Author has been deleted successfully');
      done();
    })
  })
});

module.exports = app