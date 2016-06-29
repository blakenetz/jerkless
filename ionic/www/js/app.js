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
    var accelID, geoID;
    var data = [];
    var active = false;
    var interval = 250;
    var accelOptions = { frequency: 1000 };
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
        }
        else {
          $scope.status = "Turn Off";
          accelID = navigator.accelerometer.watchAcceleration(accelSuccess, accelFail, accelOptions);
          setTimeout(function() {
            return geoID = navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
            return findDifference();
          }, interval);
        }
        active = !active;
      }
    }

    function findDifference() {
      for (var i = 0; i < data.length; i++) {
        console.log('data[i]', data[i]);
      }
    }

    function accelSuccess(accelData) {
      $scope.x = accelData.x;
      $scope.y = accelData.y;
      $scope.z = accelData.z;
      $scope.accelTimestamp = accelData.timestamp;

      data.push(accelData);
      console.log('accelData: ', JSON.stringify(accelData));
    }
    function geoSuccess(position) {
      geoObj.latitude = position.coords.latitude;
      geoObj.longitude = position.coords.longitude;
      geoObj.timestamp = position.coords.timestamp;

      $scope.lat = position.coords.latitude;
      $scope.lon = position.coords.longitude;
      $scope.altitude = position.coords.altitude;
      $scope.geoTimestamp = position.timestamp;

      data.push(position);
      console.log('geoData: ', JSON.stringify(geoObj));
      console.log('position data: ', JSON.stringify(position));
    }

    function accelFail(err) {
      console.warn('err', err);
    }
    function geoFail(err) {
      console.warn('err', err);
    }
  }
})();
