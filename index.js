var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.get('/', funtion(req, res) {
    res.send('Hello World, mate!');
});

app.listen(port);
