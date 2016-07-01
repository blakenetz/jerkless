(function () {
  'use strict';

  L.mapbox.accessToken = 'pk.eyJ1IjoiYmxha2VmYWNlIiwiYSI6ImNpcTFlenBiZDAweDBmd25vMWJxYTRteGoifQ.VLRmQ5HxMyIdQ6qMF6EJug';
  const map = L.mapbox.map('map', 'mapbox.streets')
  .setView([40.0150, -105.2705], 13);

  var line_points = [
    [40.0150, -105.2705],
    [40.01766090562455, -105.2818218836588],
  ];

  const polyline_options = {
    color: 'red'
  };
  const polyline = L.polyline(line_points, polyline_options).addTo(map);

})()
