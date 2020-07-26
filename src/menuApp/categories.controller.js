(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

// Using resolve
CategoriesController.$inject = ['items'];
function CategoriesController(items) {
  var mainList = this;
  mainList.items = items;
}
})();
