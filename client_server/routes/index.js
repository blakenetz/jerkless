var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/routes', function(req,res,next) {
  knex('routes')
  .then(function(routes) {
    res.json(routes);
  })
})

router.post('/', function(req, res, next) {
  var mtnBike = req.body.pop();
  knex('routes')
  .insert({
    route_details: JSON.stringify(req.body),
    mtn_bike: mtnBike
  })
  .then(function () {
    res.end();
  })
})

module.exports = router;
