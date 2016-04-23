var express = require('express');
var bodyParser = require('body-parser');
var initializeDB =
require('./db/connection').initializeDB;

var app = express();
var port = process.env.PORT || 3000;

var index = require('./routes/index');
var people = require('./routes/people');
var patroni = require('./routes/patroni');


app.use(express.static('server/public'));
app.use(bodyParser.json());

///////////routes/////////////
app.use('/', index);
app.use('/people', people);
app.use('/patroni', patroni);

initializeDB();




//listen
app.listen(port, function() {
  console.log('listening on port', port);
});
