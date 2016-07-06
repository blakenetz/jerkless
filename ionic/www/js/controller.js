(function () {

  angular
  .module('bike')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'ChartFactory', 'TimeFactory', 'JerkFactory'];
  function MainCtrl($scope, ChartFactory, TimeFactory, JerkFactory) {
    var accelID, geoID, buttonID;
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
    var geoObj = { latitude: null, longitude: null };
    var circle = angular.element(document.getElementById("button-internal"));

    $scope.chartData = [xArray, yArray, zArray];
    $scope.labels = timeArray;
    $scope.magJerk = 0;
    $scope.mtnBike = false;
    $scope.toggleMtnBike = function () {
      if ($scope.mtnBike === false) $scope.mtnBike = true;
      else $scope.mtnBike = false;
    }

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

      $scope.activate = function () {
        if (active) {
          navigator.accelerometer.clearWatch(accelID);
          clearInterval(geoID);
          clearInterval(buttonID);
          circle.className = 'stateOne';

          mapData = ChartFactory.getMapData(accelData, interval);
          xArray = mapData.xArray;
          yArray = mapData.yArray;
          zArray = mapData.zArray;
          timeArray = mapData.timeArray;
          $scope.chartData = [xArray, yArray, zArray];

          if (timeArray.length) timeArray = TimeFactory.adjustTimeArray(timeArray);
          $scope.labels = timeArray;

          if (accelData.length) {
            var magJerk = ChartFactory.getMagJerk(accelData);
            $scope.magJerk = magJerk;
            JerkFactory.mergeData(accelData, geoData);
            accelData.push($scope.mtnBike);
            JerkFactory.postData(accelData);
          }
        } else {
          accelData = [];
          geoData = [];
          xArray = [];
          yArray = [];
          zArray = [];
          timeArray = [];
          recordedData = [];
          changeClass(circle);
          accelID = navigator.accelerometer.watchAcceleration(accelSuccess, accelFail, accelOptions);
          geoID = setInterval(getCurrentPosition, interval);
          buttonID = setInterval(changeClass, 500)
        }

        active = !active;
      }
    }

    function changeClass() {
      if (circle.className === 'stateOne') return circle.className = 'stateTwo';
      else return circle.className = 'stateOne';
    }

    function getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, geoOptions)
    }

    function accelSuccess(results) {
      accelData.push(results);
    }
    function geoSuccess(position) {
      geoObj.latitude = position.coords.latitude;
      geoObj.longitude = position.coords.longitude;
      geoData.push(geoObj);
      geoObj = {
        latitude: null,
        longitude: null,
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
