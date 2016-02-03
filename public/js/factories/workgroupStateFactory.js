angular
  .module('app')

  .factory('WorkGroupState', function () {

    var data = {
        WorkgroupState: '',
        ProfessionState: ''
    };

    return {
        getSetWorkgroup: function () {
            return data.WorkgroupState;
        },
        setWorkgroup: function (workgroup) {
            data.WorkgroupState = workgroup;
        },
        getProfession: function() {
          return data.ProfessionState;
        },
        setProfession: function(profession) {
          data.ProfessionState = profession;
        }
    };
  });
