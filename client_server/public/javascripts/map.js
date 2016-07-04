(function () {
  'use strict';
  require('dotenv').config();

  var knex = require('../../db/knex');

  L.mapbox.accessToken = process.env.ACCESS_TOKEN;
  const map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40.018, -105.27], 14);

  let line_points = [
    [40.018, -105.27111],
    [40.018, -105.27112],
  ]
  let polyline_options = { color: 'red' }
  let polyline = L.polyline(line_points, polyline_options).addTo(map);


})()
