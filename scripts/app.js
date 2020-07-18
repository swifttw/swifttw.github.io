(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.directive('foundItems', FoundItemsDirective)
.service('MenuSearchService', MenuSearchService);



NarrowItDownController.$inject = ['$scope','MenuSearchService'];
function NarrowItDownController ($scope,MenuSearchService) {
	var narrowItDownList = this;
 
  narrowItDownList.getMatchedMenuItems = function () {
        var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
        promise.then(function (response) {
            narrowItDownList.found =  response;
        })
        .catch(function (error) {
          console.log(error);
        })
      
  };


  narrowItDownList.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    narrowItDownList.found.splice(itemIndex, 1);
  };

}
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
    ,
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };

  return ddo;
}
function FoundItemsDirectiveLink(scope, element, attrs, controller) {
  scope.$watch('list.hasResult()', function (newValue, oldValue) {
    if ( newValue ){
        removeCookieWarning();
    }
    else {
        displayCookieWarning();
    }

  });

  function displayCookieWarning() {
    // Using Angluar jqLite
    var warningElem = element.find("div.error");
    console.log(warningElem);
    warningElem.css('display', 'block');
  }


  function removeCookieWarning() {
    // Using Angluar jqLite
    var warningElem = element.find("div.error");
    warningElem.css('display', 'none');
  }
}

function FoundItemsDirectiveController() {
  var list = this;

  list.hasResult = function () {
    if (list.found == undefined) {
       return true;
    }
    if (list.found && list.found.length>0) {
       return true;
    } 
    return false;
  };
}

MenuSearchService.$inject = ['$q','$http'];
function MenuSearchService($q,$http) {
  var service = this;
  
  service.getMatchedMenuItems = function (searchTerm) {

    var deferred = $q.defer();

    $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function (response) {
        var foundItems = [];

        if (searchTerm != undefined && searchTerm.trim().length>0) {
          var allItems = response.data.menu_items;
          var x;
          for (x in allItems) {
            if (allItems[x].description.toLowerCase().includes(searchTerm.toLowerCase())) {
              foundItems.push(allItems[x]);
            }
          }
        }
        deferred.resolve(foundItems); 
    })
    .catch(function (error) {
      console.log(error);
      deferred.reject(err);
    })
    return deferred.promise;
  };

}

})();

