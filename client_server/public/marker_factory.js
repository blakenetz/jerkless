(function () {

  angular
  .module('jerk')
  .factory('MarkerFactory', MarkerFactory);

  MarkerFactory.$inject = ['$http'];
  function MarkerFactory($http) {
    var beer = false;

    return {
      placeMarkers: function functionName(latlon, map, foursquarePlaces) {
        var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
        '?client_id=FXYG1VISVFFFBTPQGOHSJG5QMWZ3QCQV2GQVLXO3LOLDKAMN' +
        '&client_secret=XOH4OBQHFJQEJXIBTI2I4M5UU4TEAV530JPIZYBMYYHQ1GX1' +
        '&v=20200101' +
        '&ll=' + latlon +
        '&query=brewery' +
        '&m=foursquare';

        if (beer === false) {
          $http.get(API_ENDPOINT)
          .then(function (result) {
            for (var i = 0; i < result.data.response.venues.length; i++) {
              var venue = result.data.response.venues[i];
              var latlng = L.latLng(venue.location.lat, venue.location.lng);
              var marker = L.marker(latlng, {
                icon: L.mapbox.marker.icon({
                  'marker-color': '#6BAAAA',
                  'marker-symbol': 'beer',
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
      },
    }
  }
})()
