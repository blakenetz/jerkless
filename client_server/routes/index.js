var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  res.render('index')
});

router.post('/', function(req, res, next) {
  var body = req.body
  for (var i = 0; i < req.body.length; i++) {
    knex('locations')
    .insert({
      latitude: req.body[i].latitude,
      longitude: req.body[i].longitude,
    }, 'location_id')
    .then(function (id) {
      knex('routes')
      .insert({
        jerk_value: body[i].jerk_value,
        location_start: id,
        location_end: id+1,
      });
    })
    .then(function () {
      res.end();
    })
  }
})

module.exports = router;
