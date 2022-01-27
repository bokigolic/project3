var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hiking-express backend - Express (index route "/")' });
});

module.exports = router;
