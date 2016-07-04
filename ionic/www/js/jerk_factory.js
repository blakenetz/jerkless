(function () {

  angular
  .module('bike')
  .factory('JerkFactory', JerkFactory);

  JerkFactory.$inject = ['$http', '$q'];
  function JerkFactory($http, $q) {
    return {
      mergeData: function (accelData, geoData) {
        for (var i = 0; i < accelData.length; i++) {
          var jerk_value = 0;
          jerk_value = Math.sqrt( Math.pow(accelData[i].x, 2) + Math.pow(accelData[i].y, 2) + Math.pow(accelData[i].z, 2) );
          accelData[i].jerk_value = jerk_value;
          delete accelData[i].x;
          delete accelData[i].y;
          delete accelData[i].z;
          delete accelData[i].timestamp;
          if (geoData[i]) Object.assign(accelData[i], geoData[i])
        }
      },

      postData: function (accelData) {
        // var url = "https://jerkmaps.herokuapp.com";
        var url = 'http://Blake.local:3000';
        var deferred = $q.defer();

        $http.post(url, accelData)
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
