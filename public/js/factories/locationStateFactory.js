angular
  .module('app')

  .factory('LocationState', function () {

    var data = {
        CountyState: '',
        MunicipalityState: ''
    };

    return {
        getCounty: function () {
            return data.CountyState;
        },
        setCounty: function (location) {
            data.CountyState = location;
        },
        getMunicipality: function () {
          return data.MunicipalityState;
        },
        setMunicipality: function (municipality) {
          data.MunicipalityState = municipality;
        }
    };
  });
