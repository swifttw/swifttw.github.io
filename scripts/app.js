(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController )
.controller('AlreadyBoughtController', AlreadyBoughtController )
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

var defaultItems = [
	{name:"Cookies", quantity:"5"},
	{name:"Pineapple", quantity:"1"},
	{name:"Scones", quantity:"3"},
	{name:"Apples", quantity:"5"},
	{name:"Eggs", quantity:"6"},
	{name:"Tomatos", quantity:"4"}
	];
// ToBuyController
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
	var toBuyList = this;
  	toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
	toBuyList.buyItem = function (itemIndex) {
	    ShoppingListCheckOffService.buyItem(itemIndex);
	};
  
}

// AlreadyBoughtController
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
	var boughtList = this;
  	boughtList.items = ShoppingListCheckOffService.getItemsBought();
  
}
function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = defaultItems

  var itemsBought = [];

  service.buyItem = function (itemIndex) {
  	var itemPicked = itemsToBuy[itemIndex];
  	itemsToBuy.splice(itemIndex, 1);
  	itemsBought.push (itemPicked);
  };
  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  service.getItemsBought = function () {
    return itemsBought;
  };
}


})();
