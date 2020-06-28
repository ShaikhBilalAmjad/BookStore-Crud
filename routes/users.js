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
    client.query('SELECT * from readers ',function(err, result){
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
      client.query('SELECT * from readers WHERE user_id = $1',[req.params.id],function(err, result){
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
    client.query('INSERT INTO readers (user_name, designation) VALUES ($1, $2);',[req.body.name,req.body.designation],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('Reader with name '+req.body.name+' with designation '+req.body.designation+' added Successfully');
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
    client.query('UPDATE readers SET user_name = $1, designation = $2 where author_id= $3',[req.body.name,req.body.designation,req.params.id],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('Reader has been updated successfully');
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
    client.query('DELETE from readers where user_id= $1',[req.params.id],function(err, result){
      if(err){
        return console.error('error running query',err);
      }
      res.status(200).send('Reader has been deleted successfully');
      done();
    })
  })
});

module.exports = app