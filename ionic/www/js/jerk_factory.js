(function () {

  angular
  .module('bike')
  .factory('JerkFactory', JerkFactory);

  JerkFactory.$inject = ['$http', '$q'];
  function JerkFactory($http, $q) {
    return {
      mergeData: function (accelData, geoData) {
        for (var i = 0; i < accelData.length; i++) {
          if (geoData[i]) Object.assign(accelData[i], geoData[i])
        }
        console.log(JSON.stringify(accelData, null, 2));
      },

      standardizeData: function(recordedData) {
        var routes = [];
        // var url = "https://jerkmaps.herokuapp.com";
        var url = 'http://Blake.local:3000';
        var deferred = $q.defer();
        var jerk_value = 0;
        var counter = 1;


        for (var i = 0; i < recordedData.length; i++) {
          var route = {};
          if (recordedData[i].length === 6) {
            jerk_value = Math.sqrt( Math.pow(recordedData[i][0].x, 2) + Math.pow(recordedData[i][1].y, 2) + Math.pow(recordedData[i][2].z, 2) ) / counter;
            route.jerk_value = jerk_value;
            route.location = [recordedData[i][4].latitude, recordedData[i][5].longitude];
            routes.push(route);
            jerk_value = 0;
            counter = 1;
          } else {
            jerk_value += ( Math.sqrt( Math.pow(recordedData[i][0].x, 2) + Math.pow(recordedData[i][1].y, 2) + Math.pow(recordedData[i][2].z, 2) ) );
            counter++;
          }
        }

        console.log(JSON.stringify(routes, null, 2));

        console.log('factory called');
        $http.post(url, routes)
        .then(function (success) {
          deferred.resolve(success)
        })
        .catch(function (err) {
          deferred.reject(err)
        })

        return deferred.promise;
      },
    }
  }
})()
