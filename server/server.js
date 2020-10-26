const express = require('express');
const app = express();
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
// const url = "mongodb://mongo:27017";

let db;

MongoClient.connect(url, (err, client) => {
  db = client.db('learning-platform');
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req, res) => {
  db.collection('users').insertOne({ test: 'test' })
  db.collection('users').find().toArray((err, result) => {
    res.send(result);
  })
});

app.listen(3000);
