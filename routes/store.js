var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('store.jade', { title: 'Store shit' });
});

module.exports = router;