(function () {

  angular
  .module('jerk')
  .controller('JerkCtrl', JerkCtrl)

  JerkCtrl.$inject = ['$scope', '$http'];
  function JerkCtrl($scope, $http) {
    var routes = [];
    var colors = [];
    var latlon= [40.018, -105.27];
    var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
    '?client_id=FXYG1VISVFFFBTPQGOHSJG5QMWZ3QCQV2GQVLXO3LOLDKAMN' +
    '&client_secret=XOH4OBQHFJQEJXIBTI2I4M5UU4TEAV530JPIZYBMYYHQ1GX1' +
    '&v=20200101' +
    '&ll=' + latlon +
    '&query=brewery' +
    '&m=foursquare';

    var beer = false;
    L.mapbox.accessToken = 'pk.eyJ1IjoiYmxha2VmYWNlIiwiYSI6ImNpcTFlenBiZDAweDBmd25vMWJxYTRteGoifQ.VLRmQ5HxMyIdQ6qMF6EJug';
    var map = L.mapbox.map('map', 'mapbox.streets')
    .setView(latlon, 14);

    var foursquarePlaces = L.layerGroup().addTo(map);
    map.attributionControl
    .addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');

    $scope.beer = function () {
      if (beer === false) {
        $http.get(API_ENDPOINT)
        .then(function (result) {
          for (var i = 0; i < result.data.response.venues.length; i++) {
            var venue = result.data.response.venues[i];
            var latlng = L.latLng(venue.location.lat, venue.location.lng);
            var marker = L.marker(latlng, {
              icon: L.mapbox.marker.icon({
                'marker-color': '#FFDD00',
                'marker-symbol': 'heart',
                'marker-size': 'large'
              })
            })
            .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '" target="_blank">' +
            venue.name + '</a></strong>')
            .addTo(foursquarePlaces)
          }
        })
        beer = true;
      } else {
        map.removeLayer(foursquarePlaces)
        beer = false;
      }
    }

    $http.get('/routes')
    .then(function(linepoints) {
      for (var i = 0; i < linepoints.data.length; i++) {
        routes.push([])
        colors.push([])
        for (var j = 0; j < linepoints.data[i].route_details.length; j++) {
          if (linepoints.data[i].route_details[j].latitude && linepoints.data[i].route_details[j].longitude) {
            routes[i].push([+linepoints.data[i].route_details[j].latitude, +linepoints.data[i].route_details[j].longitude])
            if (!linepoints.data[i].mtn_bike) {
              colors[i].push({
                color: getColor(+linepoints.data[i].route_details[j].jerk_value),
                smoothFactor: 15,
                clickable: false,
                weight: 3,
              })
            } else {
              colors[i].push({
                color: getMtnColor(+linepoints.data[i].route_details[j].jerk_value),
                smoothFactor: 15,
                clickable: false,
                weight: 3,
              })
            }
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

    function getMtnColor(jerk_value) {
      if (jerk_value < 30) return 'green';
      if (jerk_value >= 30 && jerk_value < 60) return 'yellow';
      if (jerk_value >= 60) return 'red';
    }
  }
})()
