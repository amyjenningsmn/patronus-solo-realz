var router = require('express').Router();
var path = require('path');
var pg = require('pg');

var connectionString = require('../db/connection').connectionString;

router.post('/addPatronus', function(request, response) {

  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var result = [];
      // an array because it will match the array we'll send in our var query
      var patronus_name = request.body.patronus_name;

      var query = client.query('INSERT INTO PATRONI (patronus_name) VALUES ($1) ' +
      'RETURNING id, patronus_name', [patronus_name]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        response.send(result);
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        response.status(500).send(error);
      });
    }
  })
});

router.get('/allPatroni', function(request, response) {
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM patroni');
      var results = [];
      query.on('error', function(err){
        console.log(err);
        done();
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

module.exports = router;
