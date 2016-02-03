angular
  .module('app')

  .factory('LocationState', function () {

    var data = {
        LocationState: '',
        MunicipalityState: ''
    };

    return {
        getLocation: function () {
            return data.LocationState;
        },
        setLocation: function (location) {
            data.LocationState = location;
        },
        getMunicipality: function () {
          return data.MunicipalityState;
        },
        setMunicipality: function (municipality) {
          data.MunicipalityState = municipality;
        }
    };
  });
