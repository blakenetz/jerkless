(function () {

  angular
  .module('bike')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$http', 'AccelFactory', 'GeoFactory', 'TimeFactory', 'JerkFactory'];
  function MainCtrl($scope, $http, AccelFactory, GeoFactory, TimeFactory, JerkFactory) {
    var accelID, geoID;
    var magJerk = 0;
    var sum = 0;
    var accelData = [];
    var geoData = [];
    var xArray = [];
    var yArray = [];
    var zArray = [];
    var timeArray = [];
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

          newAccelData = AccelFactory.getAccelData(accelData, interval);
          xArray = newAccelData.xArray;
          yArray = newAccelData.yArray;
          zArray = newAccelData.zArray;
          timeArray = newAccelData.timeArray;
          recordedData = newAccelData.recordedData;

          GeoFactory.getGeoData(geoData, recordedData);
          $scope.chartData = [xArray, yArray, zArray];

          if (timeArray.length) TimeFactory.adjustTimeArray(timeArray);
          $scope.labels = timeArray;

          JerkFactory.getMagJerk(recordedData);
          magJerk = (sum/magJerkArray.length).toFixed(2);
          $scope.magJerk = magJerk;
          JerkFactory.standardizeData(recordedData);
        }
        else {
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
          $scope.status = "Turn Off";
          accelID = navigator.accelerometer.watchAcceleration(accelSuccess, accelFail, accelOptions);
          geoID = navigator.geolocation.watchPosition(geoSuccess, geoFail, geoOptions);
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
