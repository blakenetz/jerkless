var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({test: 'hi from node index.js'})
});

router.post('/', function(req, res, next) {
  console.log('req', req.body);
})

module.exports = router;
