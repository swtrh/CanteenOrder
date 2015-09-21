var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('store.jade', { title: 'Store shit' });
});

router.route('/message')
    .post(function(req, res, next) {
        console.log("Receiving msg " + req.body.message);
        res.send('Message was ' + req.body.message);
    });

console.log("Started 'store' module");
module.exports = router;