(function () {
  var dependencies = ['ionic', 'ngCordova'];

  angular
  .module('bike', dependencies)
  .run(runIonic)
  .controller('MainCtrl', MainCtrl);

  runIonic.$inject = ['$ionicPlatform'];
  function runIonic($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }

  MainCtrl.$inject = ['$scope'];
  function MainCtrl($scope) {
    var accelID, geoID, jerk, magJerk;
    var accelData = [];
    var geoData = [];
    var jerkArray = [];
    var active = false;
    var interval = 250;
    var accelOptions = { frequency: interval };
    var geoObj = {
      latitude: null,
      longitude: null,
      timestamp: null
    };

    $scope.status = "Turn On"

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {


      $scope.activate = function () {
        if (active) {
          $scope.status = "Turn On";
          navigator.accelerometer.clearWatch(accelID);
          navigator.geolocation.clearWatch(geoID);
          console.log('before', jerkArray);
          for (var i = 0; i < accelData.length-1; i++) {
            for (var dataPoint in accelData[i]) {
              jerk = (accelData[i+1][dataPoint] - accelData[i][dataPoint]) / interval;
              jerkArray.push({[dataPoint]: jerk})
            }
          }
          console.log('after', JSON.stringify(jerkArray));

          geoData = [];
          accelData = [];
        }
        else {
          $scope.status = "Turn Off";
          accelID = navigator.accelerometer.watchAcceleration(accelSuccess, accelFail, accelOptions);
          navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
        }
        active = !active;
      }
    }

    function accelSuccess(results) {
      $scope.x = results.x;
      $scope.y = results.y;
      $scope.z = results.z;
      $scope.accelTimestamp = results.timestamp;

      accelData.push(results);
    }
    function geoSuccess(position) {
      geoObj.latitude = position.coords.latitude;
      geoObj.longitude = position.coords.longitude;
      geoObj.timestamp = position.coords.timestamp;

      window.setTimeout(function () {
        geoData.push(geoObj);
        geoObj = {};
      }, interval)

      $scope.lat = position.coords.latitude;
      $scope.lon = position.coords.longitude;
      $scope.altitude = position.coords.altitude;
      $scope.geoTimestamp = position.timestamp;

    }

    function accelFail(err) {
      console.warn('err', err);
    }
    function geoFail(err) {
      console.warn('err', err);
    }
  }
})();
