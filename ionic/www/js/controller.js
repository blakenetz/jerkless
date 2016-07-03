(function () {

  angular
  .module('bike')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'AccelFactory', 'GeoFactory', 'TimeFactory', 'JerkFactory'];
  function MainCtrl($scope, AccelFactory, GeoFactory, TimeFactory, JerkFactory) {
    var accelID, geoID;
    var accelData = [];
    var geoData = [];
    var xArray = [];
    var yArray = [];
    var zArray = [];
    var timeArray = [];
    var active = false;
    var interval = 250;
    var accelOptions = { frequency: interval };
    var geoOptions = { enableHighAccuracy: true };
    var geoObj = { latitude: null, longitude: null, timestamp: null };

    $scope.chartData = [xArray, yArray, zArray];
    $scope.labels = timeArray;
    $scope.status = "Turn On";
    $scope.magJerk = 0;

    var url = "http://localhost:3000";
    // var url = "https://jerkmaps.herokuapp.com";


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

          if (timeArray.length) timeArray = TimeFactory.adjustTimeArray(timeArray);
          $scope.labels = timeArray;

          var magJerk = JerkFactory.getMagJerk(recordedData);
          if (recordedData.length) {
            $scope.magJerk = magJerk;
            JerkFactory.standardizeData(recordedData);
          }

        }
        else {
          accelData = [];
          geoData = [];
          xArray = [];
          yArray = [];
          zArray = [];
          timeArray = [];
          recordedData = [];
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
