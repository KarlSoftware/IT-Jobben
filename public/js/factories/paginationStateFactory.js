angular
  .module('app')

  .factory('PaginationState', function () {

    var data = {
        currentPage: 0
    };

    return {
        getPagination: function () {
            return data.currentPage;
        },
        setPagination: function (page) {
            data.currentPage = page;
        }
    };
  });
