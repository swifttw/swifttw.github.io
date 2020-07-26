(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuApp/templates/home.template.html'
  })

  //  categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuApp/templates/categories.template.html',
    controller: 'CategoriesController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().then (function(items){
          return items;
        });
      }]
    }
  })

  //  items
  .state('items', {
    url: '/items/{itemId}',
    templateUrl: 'src/menuApp/templates/items.template.html',
    controller: 'ItemsController as itemList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.itemId)
                .then(function (items) {
                  return items;
                });
            }]
    }
  });
}

})();
