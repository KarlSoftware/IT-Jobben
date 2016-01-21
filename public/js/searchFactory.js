angular
  .module('app')

  .factory('Data', function () {

    var data = {
        SearchTerm: ''
    };

    return {
        getSearchTerm: function () {
            return data.SearchTerm;
        },
        setSearchTerm: function (searchTerm) {
            data.SearchTerm = searchTerm;
        }
    };
  });
