angular
  .module('app')

  .factory('WorkGroupState', function () {

    var data = {
        WorkgroupState: ''
    };

    return {
        getSetWorkgroup: function () {
            return data.WorkgroupState;
        },
        setWorkgroup: function (workgroup) {
            data.WorkgroupState = workgroup;
        }
    };
  });
