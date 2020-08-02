(function() {
'use strict';

angular.module('admin')
.config(routeConfig);

routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('signup', {
      templateUrl: 'src/admin/admin.html'
    })
    .state('myinfo', {
      templateUrl: 'src/admin/myinfo.html'
    });
}
})();