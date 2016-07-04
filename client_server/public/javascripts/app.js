(function () {
  'use strict';

  L.mapbox.accessToken = 'pk.eyJ1IjoiYmxha2VmYWNlIiwiYSI6ImNpcTFlenBiZDAweDBmd25vMWJxYTRteGoifQ.VLRmQ5HxMyIdQ6qMF6EJug';
  const map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40.018, -105.27], 14);

  let line_points = [
    [40.018, -105.27111],
    [40.018, -105.27112],
  ]
  let polyline_options = { color: 'red' }
  let polyline = L.polyline(line_points, polyline_options).addTo(map);


})()
