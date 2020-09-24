const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req, res) => {
  console.log('test');
});

app.listen(3000);





// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   const dbo = db.db("mydb");

//   dbo.createCollection("customers", function (err, res) {
//     if (err) throw err;

//     console.log("Collection created!");
//     db.close();
//   });
// });