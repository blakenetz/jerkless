var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/addroute', function(req, res, next) {
  console.log(req);
  console.log(res);
});

module.exports = router;
