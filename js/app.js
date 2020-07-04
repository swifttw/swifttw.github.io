(function () {
'use strict';

angular.module('LunchChckerApp', [])

.controller('LunchChckerController', LunchChckerController );

function LunchChckerController ($scope,
                       			$filter,
                       			$injector) {

	$scope.checkLunchItems = function () {
		var lunchMenuItemsEntered = $scope.lunchMenuItems;

		if (lunchMenuItemsEntered == undefined || !checkNotEmpty(lunchMenuItemsEntered) ) {
			$scope.resultMessage = "Please enter data first";
			$scope.resultColor = "red";
		}
		else {
			var lunchMenuItemsArray = lunchMenuItemsEntered.split(",")
			lunchMenuItemsArray = lunchMenuItemsArray.filter(checkNotEmpty);

			if (lunchMenuItemsArray.length == 0) {
				$scope.resultMessage = "["+lunchMenuItemsEntered+"] is not valid, list comma separated dishes you usually have for lunch.";
				$scope.resultColor = "red";
			}
			else {
				$scope.resultColor = "green";
				if  (lunchMenuItemsArray.length>3) {
					$scope.resultMessage = "Too much!";
				}
				else {
					$scope.resultMessage = "Enjoy!";
				}
			}
		}

		
  	};
  
}
function checkNotEmpty(lunchItem) {
  return lunchItem.trim().length>0;
}

})();
