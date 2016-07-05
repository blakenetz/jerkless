var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// router.get('/line-points', function(req,res,next) {
//   knex('line-points')
//   .then(function(linePoints) {
//     res.json(linePoints);
//   })
// })

router.post('/', function(req, res, next) {
  var body = req.body
  knex('routes')
  .max('route_id').returning('route_id')
  .then(function (id) {
    if (id[0].max === null) id[0].max = 0;
    Number(id[0].max);
    for (var i = 0; i < body.length; i++) {
      knex('routes')
      .insert({
        latitude: body[i].latitude,
        longitude: body[i].longitude,
        jerk_value: body[i].jerk_value,
        route_id: id[0].max+1,
      })
      .then(function () {
        res.end();
      })
    }
  })
})

module.exports = router;
