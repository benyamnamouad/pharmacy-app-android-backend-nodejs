var express = require("express");
var mysql = require("mysql");
var app = express();
app.use(express.static("public"));
var bodyparser = require("body-parser");
app.use(bodyparser.json());

//database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pharma_db"
});
connection.connect();

// Server creation
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
});

const accountSid = 'ACeac647a645f908fe7555222ce674e7b0';
const authToken = 'ce2bce18a94bd5214a374b51d7c30fb4';
const client = require('twilio')(accountSid, authToken);

var generator = require('generate-password');
 
var password = generator.generate({
    length: 10,
    numbers: true
});
console.log(password);

client.messages
  .create({
     body: password,
     from: '+12074075156',
     to: '+213777875776'
   })
  .then(message => console.log(message.sid));
  
  console.log("Node server running on port 3000");


// Rest service getting all the users
app.get("/getusers", function(req, res) {
  var query = "select * from users ";
  connection.query(query, function(error, results) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});
