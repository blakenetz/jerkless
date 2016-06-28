(function () {
  'use strict';
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
    document.addEventListener("deviceready", function () {
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        console.log(result);
      }, function(err) {
        console.log(err);
      });
    }, false)
  }

})();
