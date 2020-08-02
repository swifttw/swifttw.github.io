(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$q','$http', 'ApiPath'];
function MenuService($q,$http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  // service.getMenuItem = function (menuShortName) {
  //   var config = {};
  //   if (menuShortName) {
  //     config.params = {'category': category};
  //   }

  //   return $http.get(ApiPath + '/menu_items/'+menuShortName+".json", config).then(function (response) {
  //     return response.data;
  //   });
  // };

  // service.getMenuItem = function (menuShortName) {
  //   var config = {};
  //   // if (menuShortName) {
  //   //   config.params = {'category': category};
  //   // }

  //   return $http.get(ApiPath + '/menu_items/'+menuShortName+".json", config).then(function (response) {
  //       console.log("GETBACK " + response);
  //       return response.data;
  //     }, function(response) {
  //       // Second function handles error
  //       console.log("WRONG");

  //   });
  // };
  service.getMenuItem = function (menuShortName) {

    var deferred = $q.defer();

    $http({
      method: "GET",
      url: ApiPath + '/menu_items/'+menuShortName+".json"
      }).then(function (response) {
        console.log("getMenuItem ");

        console.log(response.data);
        deferred.resolve(response.data); 
    })
    .catch(function (error) {
      console.log("HTTPERRO"+error);
      deferred.reject(error);
    })
    return deferred.promise;
  };

  service.saveRegistration = function (registartion) {
    console.log ("save");
    console.log (registartion);
    service.registartion = registartion;
  };
  service.getRegistration = function () {
    console.log ("get");
    console.log (service.registartion);
    return service.registartion;
  };
}

})();
