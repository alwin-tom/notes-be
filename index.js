var express = require('express');
var request = require('request');
bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(cors())

const BASE_URL = 'https://crudcrud.com/api/0cc6e7c36346447bb2056fa6dfe323c0';

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/notes', function (req, res) {
    request.get(BASE_URL + "/notes", function (error, request, body) {
        res.json(JSON.parse(body));
    })
});

app.get('/notes/:noteId', function (req, res) {
    request({
        url: BASE_URL + "/notes/" + req.params.noteId,
        method: "GET"
    }, function (error, request, body) {
        res.json(JSON.parse(body));
    });
    
});

app.post('/notes', function (req, res) {
    request({
        url: BASE_URL + "/notes",
        method: "POST",
        json: req.body
    }, function (error, request, body) {
        res.json(body);
    });
});

app.put('/notes/:noteId', function (req, res) {
    request({
        url: BASE_URL + "/notes/" + req.params.noteId,
        method: "PUT",
        json: req.body
    }, function (error, request, body) {
        res.json(body);
    });
});

app.delete('/notes/:noteId', function (req, res) {
    request({
        url: BASE_URL + "/notes/" + req.params.noteId,
        method: "DELETE"
    }, function (error, request, body) {
        res.json(body);
    });
    
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});