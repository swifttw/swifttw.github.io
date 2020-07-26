(function () {
'use strict';

// shows all of the menu items for a particular category.
angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuApp/templates/itemList.template.html',
  bindings: {
    items: '<'
  }
});

})();
