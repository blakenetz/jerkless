(function () {
  console.log('log on top of app.js');
  const dependencies = ['ionic', 'ngCordova'];

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

  MainCtrl.$inject = ['$scope', '$cordovaDeviceMotion'];
  function MainCtrl($scope, $cordovaDeviceMotion) {
    console.log('within MainCtrl');
    $scope.activate = function () {
      console.log('on button push');
    }

    document.addEventListener("deviceready", function () {
      console.log('hi');
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        console.log(result);
      }, function(err) {
        console.log(err);
      });
    }, false)
  }


})();
