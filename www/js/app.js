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

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      $scope.activate = function () {
        if (active) navigator.accelerometer.clearWatch(watchID);
        else watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        active = !active;
      }
    }

    function onSuccess(results) {
      $scope.x = results.x;
      $scope.y = results.y;
      $scope.z = results.z;
      $scope.timestamp = results.timestamp;

      console.log('results', results);
    }

    function onError(err) {
      console.log('err', err);
    }
  }
})();
