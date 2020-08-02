(function () {
"use strict";

angular.module('admin')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService'];
function MyInfoController(MenuService) {
  var info = this;


  info.available = function () {
  	 var savedRegistartion = MenuService.getRegistration();
     if (savedRegistartion == undefined)  {
       return false;
     }
     info.registration = savedRegistartion;
     return true;   
  };

}

})();