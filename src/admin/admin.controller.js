(function () {
"use strict";

angular.module('admin')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['MenuService'];
function RegistrationController(MenuService) {
  var reg = this;
  reg.favoritenotfound = false;
  reg.submit = function () {
  	var shortName = reg.user.favorite;

	var promise = MenuService.getMenuItem(shortName);
    promise.then(function (response) {
    	reg.user.favoritenotfound = false;
    	reg.completed = true;
      var favoriteData = {"category_short_name":response["category_short_name"],
                          "description":response["description"]
      }
    	var registration =  {
		  "firstname": reg.user.firstname,
		  "lastname": reg.user.lastname,
		  "email": reg.user.email,
		  "phone": reg.user.phone,
		  "favorite": favoriteData
		};
    console.log (registration);
    	MenuService.saveRegistration(registration)
   
     })
     .catch(function (error) {
      	reg.favoritenotfound = true;
      	reg.completed = false;
     });

    
  };

}

})();