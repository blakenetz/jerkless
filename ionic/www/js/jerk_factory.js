(function () {

  angular
  .module('bike')
  .factory('JerkFactory', JerkFactory);

  JerkFactory.$inject = ['$http', '$q'];
  function JerkFactory($http, $q) {
    var url = "http://localhost:3000";
    // var url = "https://jerkmaps.herokuapp.com";
    // var socket = io.connect(url);
    var deferred = $q.defer();

    return {
      getMagJerk: function(recordedData) {
        var magJerkArray = [];
        var jerkSqr = 0;
        var sum = 0;

        for (var i = 0; i < recordedData.length; i++) {
          for (var j = 0; j < recordedData[i].length; j++) {
            for (var dataPoint in recordedData[i][j]) {
              if (dataPoint==='x' || dataPoint==='y' || dataPoint==='z') {
                jerkSqr += Math.pow(recordedData[i][j][dataPoint], 2);
              }
              if (dataPoint==='timestamp') {
                jerkSqr = Math.sqrt(jerkSqr);
                magJerkArray.push(jerkSqr);
                jerkSqr = 0;
              }
            }
          }
        }
        for (var i = 0; i < magJerkArray.length; i++) {
          sum += magJerkArray[i]
        }
        var magJerk = (sum/magJerkArray.length).toFixed(2);
        return magJerk;
      },

      standardizeData: function(recordedData) {
        var route = {};
        var jerk_value = Math.sqrt( Math.pow(recordedData[0][0].x, 2) + Math.pow(recordedData[0][1].y, 2) + Math.pow(recordedData[0][2].z, 2) );
        route.location = [recordedData[0][4].latitude, recordedData[0][5].longitude];
        route.jerk_value = jerk_value;

        $http.get(url)
        .then(function success(success) {
          deferred.resolve(success)
        })
        .catch(function(error) {
          deferred.reject(error)
        })
        return deferred.promise

        // socket.emit('route', {response: 'route data'})
      },
    }
  }
})()
