angular
  .module('app')

  .factory('BreadcrumbState', function () {

    var data = {
        WorkgroupBreadcrumbState: '',
        ProfessionBreadcrumbState: '',
        CountyBreadcrumbState: '',
        MunicipalityBreadcrumbState: ''
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
        },
        getCountyBreadcrumb: function() {
          return data.CountyBreadcrumbState;
        },
        setCountyBreadcrumb: function(breadcrumb) {
          data.CountyBreadcrumbState = breadcrumb;
        },
        getMunicipalityBreadcrumb: function() {
          return data.MunicipalityBreadcrumbState;
        },
        setMunicipalityBreadcrumb: function(breadcrumb) {
          data.MunicipalityBreadcrumbState = breadcrumb;
        }
    };
  });
