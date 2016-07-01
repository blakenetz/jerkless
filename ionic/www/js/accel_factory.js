(function () {
  'use strict';

  angular
  .module('bike')
  .factory('AccelFactory', AccelFactory);

  AccelFactory.$inject = [];
  function AccelFactory() {
    return {

      getAccelData: function(data, interval) {
        var recordedData = [];
        var jerk;
        var xArray = [];
        var yArray = [];
        var zArray = [];
        var timeArray = [];

        for (var i = 0; i < data.length-1; i++) {
          recordedData.push([]);
          for (var dataPoint in data[i]) {
            jerk = (data[i+1][dataPoint] - data[i][dataPoint]) / (interval/1000);
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
              timeArray.push((data[i+1].timestamp - data[i].timestamp) / 1000);
              recordedData[i].push({[dataPoint]: data[i].timestamp});
            }
          }
        }
        return { recordedData, xArray, yArray, zArray, timeArray };
      },

    }
  }
})()
