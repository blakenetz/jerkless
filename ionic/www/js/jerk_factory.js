(function () {

  angular
  .module('bike')
  .factory('JerkFactory', JerkFactory);

  JerkFactory.$inject = ['$http'];
  function JerkFactory($http) {
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
        // var url = "https://jerkmaps.herokuapp.com";
        var url = "http://localhost:3000";

        var jerk_value = Math.sqrt( Math.pow(recordedData[0][0].x, 2) + Math.pow(recordedData[0][1].y, 2) + Math.pow(recordedData[0][2].z, 2) );
        route.location = [recordedData[0][4].latitude, recordedData[0][5].longitude];
        route.jerk_value = jerk_value;
        console.log(JSON.stringify(route));

        $http.post(url+"/addroute", route).then(function successCallback(response) {
          console.log('success', response);
        }, function errorCallback(err) {
          console.warn(JSON.stringify(err, null, 2));
        });
      },
    }
  }
})()
