angular
  .module('app')

  .factory('LocationState', function () {

    var data = {
        LocationState: ''
    };

    return {
        getLocation: function () {
            return data.LocationState;
        },
        setLocation: function (location) {
            data.LocationState = location;
        }
    };
  });
