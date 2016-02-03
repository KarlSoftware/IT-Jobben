angular
  .module('app')

  .factory('BreadcrumbState', function () {

    var data = {
        WorkgroupBreadcrumbState: '',
        ProfessionBreadcrumbState: ''
    };

    return {
        getWorkgroupBreadcrumb: function () {
            return data.WorkgroupBreadcrumbState;
        },
        setWorkgroupBreadcrumb: function (breadcrumb) {
            data.WorkgroupBreadcrumbState = breadcrumb;
        },
        getProfessionBreadcrumb: function() {
          return data.ProfessionBreadcrumbState;
        },
        setProfessionBreadcrumb: function(breadcrumb) {
          data.ProfessionBreadcrumbState = breadcrumb;
        }
    };
  });
