var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({test: 'hi from node index.js'})
});

module.exports = router;
