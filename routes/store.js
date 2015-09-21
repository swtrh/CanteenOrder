var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var mongoUser = process.env.MONGO_USER;
var mongoPw = process.env.MONGO_PW;
var mongoDbName = process.env.MONGO_DB;

var mongoURL = 'mongodb://'+mongoUser+':'+mongoPw+'@ds041563.mongolab.com:41563/'+mongoDbName;

/* GET users listing. */
router.get('/', function(req, res, next) {
    // Get all messages
    MongoClient.connect(mongoURL, function(err, db) {
        db.collection('messages').find({}).toArray(function(err, results){
          console.log(results);
          console.log(JSON.stringify(results));
          res.render('store.jade',
              {
                  title: 'Store shit',
                  messageURL: process.env.MESSAGE_URL,
                  results: results
              });
        });
    });
    /*res.render('store.jade', {
        title: 'Store shit',
        messageURL: process.env.MESSAGE_URL,
        messages: msgCursor
    });*/
});

router.route('/message')
    .post(function(req, res, next) {
        var txtMsg = (req.body.message || 'empty message');

        // Store in mongodb
        MongoClient.connect(mongoURL, function(err, db) {
            console.log("Connected to database");

            db.collection('messages').insert({'message': txtMsg}, {w: 1}, function(err, item) {
                if(err) {
                    console.log('ERROR: You sank my battleship! ' + err);
                    db.close();
                    res.status(400).send('Faack! Can\'t store: ' + txtMsg);
                } else {
                    console.log('Message stored in db. msg -> ' + txtMsg);
                    db.close();
                    //res.status(200).send('Message stored: "<p><b>' + txtMsg + '</b></p>"');
                    res.redirect('/store');
                }
            });
        });
        console.log("Receiving msg " + req.body.message);
    });

console.log("Started 'store' module");
module.exports = router;