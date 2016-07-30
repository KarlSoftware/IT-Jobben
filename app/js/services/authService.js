var app = angular.module('app')

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://it-jobben.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);
