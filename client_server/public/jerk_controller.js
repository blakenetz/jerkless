(function () {
  'use strict';

  angular
  .module('jerk')
  .controller('JerkCtrl', JerkCtrl)

  JerkCtrl.$inject = ['$scope', '$http'];
  function JerkCtrl($scope, $http) {

    var routes = [[]];
    var colors = [[]];

    L.mapbox.accessToken = 'pk.eyJ1IjoiYmxha2VmYWNlIiwiYSI6ImNpcTFlenBiZDAweDBmd25vMWJxYTRteGoifQ.VLRmQ5HxMyIdQ6qMF6EJug';
    var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40.018, -105.27], 14);

    $http.get('/routes')
    .then(function(linepoints) {
      for (var i = 0; i < linepoints.data.length; i++) {
        if (linepoints.data[i].latitude && linepoints.data[i].longitude) {
          console.log(linepoints.data[i].jerk_value);
          if (i === 0)  {
            routes[i].push([+linepoints.data[i].latitude, +linepoints.data[i].longitude]);
            colors[i].push({
              color: getColor(+linepoints.data[i].jerk_value),
              smoothFactor: 5,
              clickable: false,
              weight: 3, 
            })
          }
          else if (linepoints.data[i].route_id === linepoints.data[i-1].route_id) {
            routes[linepoints.data[i].route_id-1].push([+linepoints.data[i].latitude, +linepoints.data[i].longitude]);
            colors[linepoints.data[i].route_id-1].push({
              color: getColor(+linepoints.data[i].jerk_value),
              smoothFactor: 5,
              clickable: false,
              weight: 3, 
            })
          }
          else {
            routes.push([]);
            colors.push([])
            routes[linepoints.data[i].route_id-1].push([+linepoints.data[i].latitude, +linepoints.data[i].longitude]);
            colors[linepoints.data[i].route_id-1].push({
              color: getColor(+linepoints.data[i].jerk_value),
              smoothFactor: 5,
              clickable: false,
              weight: 3, 
            })
          }
        }
      }

      for (var i = 0; i < routes.length; i++) {
        for (var j = 1; j < routes[i].length; j++) {
          var line_points = [ routes[i][j-1], routes[i][j] ];
          var polyline_options = colors[i][j];
          var polyline = L.polyline(line_points, polyline_options).addTo(map);
        }
      }
    })

    function getColor(jerk_value) {
      if (jerk_value < 10) return 'green';
      if (jerk_value >= 10 && jerk_value < 20) return 'yellow';
      if (jerk_value >= 20) return 'red';
    }
  }
})()
