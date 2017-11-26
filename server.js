const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/empolyeeAPIDB';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

MongoClient.connect(url, function (err, db) {
    console.log("Connected correctly to server");

    app.get('/employee', (req, res) => {
        db.collection('employee').find().toArray(function (err, docs) {
            res.send(docs);
        }); // select * from employee
    });

    app.post('/employee', (req, res) => {
        console.log(req.body);
        db.collection('employee').insert(req.body, function (err, result) {
            res.send(result);
        });
    });

});


app.listen(3000, () => console.log('Example app listening on port 3000!'))