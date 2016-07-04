(function () {
  'use strict';

  angular
  .module('bike')
  .factory('ChartFactory', ChartFactory);

  ChartFactory.$inject = [];
  function ChartFactory() {
    return {

      getMapData: function(data, interval) {
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
      getMagJerk: function(recordedData) {
        var magJerkArray = [];
        var jerkSqr = 0;
        var sum = 0;

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
        var magJerk = (sum/magJerkArray.length).toFixed(2);
        return magJerk;
      },
    }
  }
})()
