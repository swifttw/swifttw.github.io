(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuApp/templates/categoryList.template.html',
  bindings: {
    items: '<'
  }
});

})();
