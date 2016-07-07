(function () {

  angular
  .module('jerk')
  .factory('RouteFactory', RouteFactory);

  RouteFactory.$inject = ['$http'];
  function RouteFactory($http) {
    var limit = 0;
    var count = 0;
    var routes = [];
    var colors = [];

    return {
      drawLines: function (map) {
        $http.get('/routes')
        .then(function(linepoints) {
          for (var i = 0; i < linepoints.data.length; i++) {
            routes.push([])
            colors.push([])
            for (var j = 0; j < linepoints.data[i].route_details.length; j++) {
              limit++;
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
                  })
                }
              }
            }
          }
          for (var i = 0; i < routes.length; i++) {
            for (var j = 1; j < routes[i].length; j++) {
              window.setInterval(drawLines(routes, i, j), 100)
            }
          }

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

          function drawLines(routes, i, j) {
            var line_points = [ routes[i][j-1], routes[i][j] ];
            var polyline_options = colors[i][j];
            var polyline = L.polyline(line_points, polyline_options).addTo(map);
          }
        })
      },
    }
  }
})();
