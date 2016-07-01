(function () {

  angular
  .module('bike')
  .factory('TimeFactory', TimeFactory);

  TimeFactory.$inject = [];
  function TimeFactory() {
    return {

      adjustTimeArray: function(timeArray) {
        timeArray[0] = +timeArray[0].toFixed(2);
        for (var i = 1; i < timeArray.length; i++) {
          timeArray[i] += timeArray[i-1];
          timeArray[i] = +timeArray[i].toFixed(2);
        }
        if (timeArray.length > 4) {
          timeArray = reduceTimeArray(timeArray);
        }
        return timeArray;
      },
    }

    function reduceTimeArray(arr) {
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

  }
})()
