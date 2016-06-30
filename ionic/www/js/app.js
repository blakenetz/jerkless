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
    var accelID, geoID, jerk, xJerk, yJerk, zJerk;
    var magJerk = 0;
    var sum = 0;
    var accelData = [];
    var geoData = [];
    var xArray = [];
    var yArray = [];
    var zArray = [];
    var timeArray = [];
    var jerkArray = [];
    var magJerkArray = [];
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
    $scope.magJerk = magJerk;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

      $scope.activate = function () {
        if (active) {
          $scope.status = "Turn On";
          navigator.accelerometer.clearWatch(accelID);
          navigator.geolocation.clearWatch(geoID);
          getJerkArray();
          $scope.chartData = [xArray, yArray, zArray];
          for (var i = 1; i < timeArray.length; i++) {
            timeArray[i] += timeArray[i-1];
          }
          if (timeArray.length > 5) {
            timeArray = reduceTimeArray(timeArray);
            $scope.labels = timeArray;
          }
          getMagJerkArray();
          magJerk = (sum/magJerkArray.length).toFixed(2);
          $scope.magJerk = magJerk;

          accelData = [];
          geoData = [];
          xArray = [];
          yArray = [];
          zArray = [];
          timeArray = [];
          jerkArray = [];
          magJerkArray = [];
        }
        else {
          $scope.status = "Turn Off";
          accelID = navigator.accelerometer.watchAcceleration(accelSuccess, accelFail, accelOptions);
          navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
        }
        active = !active;
      }
    }

    function getJerkArray() {
      for (var i = 0; i < accelData.length-1; i++) {
        jerkArray.push([]);
        for (var dataPoint in accelData[i]) {
          jerk = (accelData[i+1][dataPoint] - accelData[i][dataPoint]) / (interval/1000);
          if (dataPoint==='x') xArray.push(jerk);
          if (dataPoint==='y') yArray.push(jerk);
          if (dataPoint==='z') zArray.push(jerk);
          if (dataPoint==='timestamp') timeArray.push(jerk / 1000);
          jerkArray[i].push({[dataPoint]: jerk});
        }
      }
      return jerkArray;
    }

    function getMagJerkArray() {
      var jerkSqr = 0;

      for (var i = 0; i < jerkArray.length; i++) {
        for (var j = 0; j < jerkArray[i].length; j++) {
          for (var dataPoint in jerkArray[i][j]) {
            if (dataPoint==='x' || dataPoint==='y' || dataPoint==='z') {
              jerkSqr += Math.pow(jerkArray[i][j][dataPoint], 2);
            }
            if (dataPoint==='timestamp') {
              jerkSqr = Math.sqrt(jerkSqr);
              magJerkArray.push(jerkSqr);
            }
          }
        }
      }
      for (var i = 0; i < magJerkArray.length; i++) {
        sum += magJerkArray[i]
      }
      return magJerkArray;
    }

    function reduceTimeArray (arr){
      var fifthsArray = [0,0,0,0,0];
      var oneFifthLength = Math.floor(arr.length / 5);

      for(var i = 0; i < 5; i++){
        var sum = 0;
        for(var j = oneFifthLength * i; j < oneFifthLength * (i+1); j++){
          sum += arr[j];
        }
        fifthsArray[i] = (sum / oneFifthLength).toFixed(2);
      }
      return fifthsArray;
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
