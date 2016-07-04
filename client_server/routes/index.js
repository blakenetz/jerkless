var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile'));

router.get('/', function(req, res, next) {
  res.render('index')
});

router.post('/', function(req, res, next) {
  // for (var i = 1; i < req.body.length; i++) {
  //   // knex('routes')
  //   // .insert()
  //   console.log(req.body[i]);
  // }
})

module.exports = router;
