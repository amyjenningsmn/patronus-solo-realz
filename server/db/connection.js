var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/patronium';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client,done){
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {

      var query = client.query('CREATE TABLE IF NOT EXISTS patroni(' +
      'id SERIAL PRIMARY KEY,' +
      'patronus_name varchar(255) NOT NULL)');

      var query2 = client.query(
      'CREATE TABLE IF NOT EXISTS people(' +
      'id SERIAL PRIMARY KEY,' +
      'first_name varchar(255) NOT NULL,' +
      'last_name varchar(255) NOT NULL,' +
      'patronus_id INT REFERENCES patroni(id));');

      var query3 = client.query(
        'SELECT * FROM people JOIN patroni ON patroni.id = people.patronus_id');

      query.on('end', function(){
        console.log('successfully ensured people exists');
        done();
      });
      query.on('error', function() {
        console.log('error creating people schema!');
        process.exit(1);
      });

      query2.on('end', function(){
        console.log('successfully ensured shiny horses exists');
        done();
      });
      query2.on('error', function() {
        console.log('error creating otters!');
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
