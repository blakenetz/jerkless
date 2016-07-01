(function () {

  angular
  .module('bike')
  .factory('GeoFactory', GeoFactory);

  function GeoFactory() {
    return {

      getGeoData: function(geoData, recordedData) {
        for (var i = 0; i < geoData.length; i++) {
          for (var j = 0; j < recordedData.length; j++) {
            if (recordedData[0].length < 6) {
              recordedData[j].push({'latitude': geoData[0].latitude}, {'longitude': geoData[0].longitude});
            } else if (geoData[i].timestamp - recordedData[j].timestamp <= 260 && recordedData[j].length < 6) {
              recordedData[j].push({'latitude': geoData[i].latitude},{'longitude': geoData[i].longitude});
            }
          }
        }
        return recordedData;
      },
      
    }
  }
})()
