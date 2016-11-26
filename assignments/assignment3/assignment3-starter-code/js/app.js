(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

function foundItemsDirective () {
    var ddo = {
        templateUrl: './foundItems.html',
        scope: {
            items: '<',
            onRemove: '&'
        },
        controller: MenuItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    }

    return ddo;
}

function MenuItemsDirectiveController () {
    var list = this;

    list.isEmpty = function () {
        if (list.items === undefined) {
            return 1;
        } else {
            return list.items.length;
        }
    }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.items;
    narrow.searchInput = "";

    narrow.menuSearch = function () {
        MenuSearchService
        .getMatchedMenuItems(narrow.searchInput)
        .then(function (items) {
            narrow.items = items;
        })
    }

    narrow.removeItem = function (index) {
        narrow.items.splice(index, 1);
    }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (result) {
            if (searchTerm.length === 0) {
                return [];
            } else {
                return result.data.menu_items.filter(function (elem, index) {
                    return elem.description.indexOf(searchTerm) >= 0;
                });
            }
        });
    };
}

})();
