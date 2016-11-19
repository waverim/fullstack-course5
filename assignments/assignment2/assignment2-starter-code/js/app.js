(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.showList = ShoppingListCheckOffService.getToBuyItems();

    toBuy.bought = function (index) {
        ShoppingListCheckOffService.checkOff(index);
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.showList = ShoppingListCheckOffService.getBoughtItems(bought);
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [{
        name: "Pen",
        quantity: 10,
    },{
        name: "Pineapple",
        quantity: 20,
    },{
        name: "Apple",
        quantity: 30,
    },{
        name: "Banana",
        quantity: 40,
    },{
        name: "NoteBook",
        quantity: 50,
    },{
        name: "Laptop",
        quantity: 60,
    }];

    var boughtItems = [];

    service.checkOff = function (index) {
        var temp = toBuyItems.splice(index, 1)[0];
        boughtItems.push(temp);
    };

    service.getToBuyItems = function (ctrl) {
        return toBuyItems;
    };

    service.getBoughtItems = function (ctrl) {
        return boughtItems;
    };
}

})();
