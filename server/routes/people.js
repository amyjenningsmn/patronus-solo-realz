var router = require('express').Router();
var path = require('path');
var pg = require('pg');

var connectionString = require('../db/connection').connectionString;

router.post('/addPerson', function(request, response) {

  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var result = [];
      // an array because it will match the array we'll send in our var query
      var first_name = request.body.first_name;
      var last_name = request.body.last_name;

      var query = client.query('INSERT INTO PEOPLE (first_name, last_name) VALUES ($1, $2) ' +
      'RETURNING id, first_name, last_name, patronus_id', [first_name, last_name]);

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

router.get('/allPeople', function(request, response) {
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM people');
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
