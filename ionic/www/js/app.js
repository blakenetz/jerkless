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
    var options = { frequency: 1000 };
    var active = false;
    var watchID;
    var data = [];
    $scope.status = "Turn On"

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      $scope.activate = function () {
        if (active) {
          $scope.status = "Turn On"
          navigator.accelerometer.clearWatch(watchID);
          console.log(data);
        }
        else {
          $scope.status = "Turn Off"
          data = [];
          watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        }
        active = !active;
      }
    }

    function onSuccess(results) {
      $scope.x = results.x;
      $scope.y = results.y;
      $scope.z = results.z;
      $scope.timestamp = results.timestamp;

      data.push(results);
    }

    function onError(err) {
      console.log('err', err);
    }
  }
})();
