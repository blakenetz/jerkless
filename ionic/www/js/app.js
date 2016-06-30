(function () {
  var dependencies = ['ionic', 'ngCordova', 'chart.js'];

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
    var xArray = [];
    var yArray = [];
    var zArray = [];
    var timeArray = [];
    var active = false;
    var interval = 250;
    var accelOptions = { frequency: interval };
    var geoObj = {
      latitude: null,
      longitude: null,
      timestamp: null
    };

    $scope.chartData = [xArray, yArray, zArray];
    $scope.labels = timeArray;
    $scope.status = "Turn On";

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {


      $scope.activate = function () {
        if (active) {
          $scope.status = "Turn On";
          navigator.accelerometer.clearWatch(accelID);
          navigator.geolocation.clearWatch(geoID);
          for (var i = 0; i < accelData.length-1; i++) {
            for (var dataPoint in accelData[i]) {
              jerk = (accelData[i+1][dataPoint] - accelData[i][dataPoint]) / (interval/1000);
              if (dataPoint==='x') xArray.push(jerk);
              if (dataPoint==='y') yArray.push(jerk);
              if (dataPoint==='z') zArray.push(jerk);
              if (dataPoint==='timestamp') timeArray.push(+(jerk / 1000).toFixed(2));
              jerkArray.push({[dataPoint]: jerk});
            }
          }
          for (var i = 1; i < timeArray.length; i++) {
            timeArray[i] += timeArray[i-1];
          }

          geoData = [];
          accelData = [];
          jerkArray = [];
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
    }

    function accelFail(err) {
      console.warn('err', err);
    }
    function geoFail(err) {
      console.warn('err', err);
    }
  }
})();
