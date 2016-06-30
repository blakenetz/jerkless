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
    var recordedData = [];
    var magJerkArray = [];
    var active = false;
    var interval = 250;
    var accelOptions = { frequency: interval };
    var geoOptions = { enableHighAccuracy: true };
    var geoObj = {
      latitude: null,
      longitude: null,
      timestamp: null
    };

    $scope.chartData = [xArray, yArray, zArray];
    $scope.labels = timeArray;
    $scope.status = "Turn On";
    $scope.magJerk = magJerk;
    $scope.geoData = geoData;

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

      $scope.activate = function () {
        if (active) {
          $scope.status = "Turn On";
          navigator.accelerometer.clearWatch(accelID);
          navigator.geolocation.clearWatch(geoID);
          getAccelData();
          // console.log(JSON.stringify(recordedData[0]));
          getGeoData();
          $scope.chartData = [xArray, yArray, zArray];
          if (timeArray.length) adjustTimeArray();
          $scope.labels = timeArray;
          getMagJerk();
          magJerk = (sum/magJerkArray.length).toFixed(2);
          $scope.magJerk = magJerk;

          accelData = [];
          geoData = [];
          xArray = [];
          yArray = [];
          zArray = [];
          timeArray = [];
          recordedData = [];
          magJerkArray = [];
          magJerk = 0;
          sum = 0;
        }
        else {
          $scope.status = "Turn Off";
          accelID = navigator.accelerometer.watchAcceleration(accelSuccess, accelFail, accelOptions);
          geoID = navigator.geolocation.watchPosition(geoSuccess, geoFail, geoOptions);
        }
        active = !active;
      }
    }

    function adjustTimeArray() {
      timeArray[0] = +timeArray[0].toFixed(2);
      for (var i = 1; i < timeArray.length; i++) {
        timeArray[i] += timeArray[i-1];
        timeArray[i] = +timeArray[i].toFixed(2);
      }
      if (timeArray.length > 4) {
        timeArray = reduceTimeArray(timeArray);
      }
      return timeArray;
    }

    function getGeoData() {
      for (var i = 0; i < geoData.length; i++) {
        for (var j = 0; j < recordedData.length; j++) {
          // console.log(JSON.stringify(recordedData[0]));
          console.log(Array.isArray(recordedData[j]));
          if (j===0) {
            recordedData[j].push({'latitude': geoData[0].latitude}, {'longitude': geoData[0].longitude});
          } else if (recordedData[0][j].timestamp - geoData[i].timestamp <= 250) {
            recordedData[j].push({'latitude': geoData[i].latitude},{'longitude': geoData[i].longitude});
          }
        }
      }
      return recordedData;
    }

    function getAccelData() {
      for (var i = 0; i < accelData.length-1; i++) {
        recordedData.push([]);
        for (var dataPoint in accelData[i]) {
          jerk = (accelData[i+1][dataPoint] - accelData[i][dataPoint]) / (interval/1000);
          if (dataPoint==='x') {
            xArray.push(jerk);
            recordedData[i].push({[dataPoint]: jerk});
          }
          if (dataPoint==='y') {
            yArray.push(jerk);
            recordedData[i].push({[dataPoint]: jerk});
          }
          if (dataPoint==='z') {
            zArray.push(jerk);
            recordedData[i].push({[dataPoint]: jerk});
          }
          else if (dataPoint==='timestamp') {
            timeArray.push((accelData[i+1].timestamp - accelData[i].timestamp) / 1000);
            recordedData[i].push({[dataPoint]: accelData[i].timestamp});
          }
        }
      }
      return recordedData;
    }

    function getMagJerk() {
      var jerkSqr = 0;
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
      geoObj.timestamp = position.timestamp;
      geoData.push(geoObj);
      $scope.geoData = geoData;
      geoObj = {
        latitude: null,
        longitude: null,
        timestamp: null
      }
    }

    function accelFail(err) {
      console.warn('err', err);
    }
    function geoFail(err) {
      console.warn('err', err);
    }

  }
})();
