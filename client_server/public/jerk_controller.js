(function () {
  'use strict';

  angular
  .module('jerk')
  .controller('JerkCtrl', JerkCtrl)

  JerkCtrl.$inject = ['$scope'];
  function JerkCtrl($scope) {

    var routes = [];
    var colors = [];

    L.mapbox.accessToken = 'pk.eyJ1IjoiYmxha2VmYWNlIiwiYSI6ImNpcTFlenBiZDAweDBmd25vMWJxYTRteGoifQ.VLRmQ5HxMyIdQ6qMF6EJug';
    var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40.018, -105.27], 14);

    // $http.get('/line-points')
    // .then(function(linePoints) {
    //     var line_points = linePoints.data;
    // })

    var line_points = [
      [40.018, -105.27111],
      [40.018, -105.27112]
    ]
    var polyline_options = { color: 'red' }
    var polyline = L.polyline(line_points, polyline_options).addTo(map);

  }
})()
