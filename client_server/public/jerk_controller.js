(function () {

  angular
  .module('jerk')
  .controller('JerkCtrl', JerkCtrl)

  JerkCtrl.$inject = ['$scope', '$http', 'RouteFactory', 'MarkerFactory'];
  function JerkCtrl($scope, $http, RouteFactory, MarkerFactory) {
    var latlon= [40.018, -105.27];
    $scope.aboutVis = false;

    L.mapbox.accessToken = 'pk.eyJ1IjoiYmxha2VmYWNlIiwiYSI6ImNpcTFlenBiZDAweDBmd25vMWJxYTRteGoifQ.VLRmQ5HxMyIdQ6qMF6EJug';
    var map = L.mapbox.map('map', 'mapbox.light')
    .setView(latlon, 14);

    var foursquarePlaces = L.layerGroup().addTo(map);
    map.attributionControl
    .addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');
    var foursquarePlaces = L.layerGroup().addTo(map);
    RouteFactory.drawRoutes(map)

    $scope.beer = function () {
      MarkerFactory.placeMarkers(latlon, map, foursquarePlaces);
    }

    $scope.about = function () {
      $scope.aboutVis = !$scope.aboutVis;
    }
  }
})()
