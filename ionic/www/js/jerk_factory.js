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
