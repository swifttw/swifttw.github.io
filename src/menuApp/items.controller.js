(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// Using resolve
ItemsController.$inject = ['items'];
function ItemsController(items,categoryName) {
  var itemList = this;
  itemList.items = items;
}

})();
