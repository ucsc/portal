var support = angular.module('main.support', ['main']);

support.config(function($stateProvider) {
    $stateProvider
        .state("main.support", {
            url: "^/support",
            templateUrl: 'sites/support/support_menu.html',
            controller : 'SupportController',
            resolve: {
                smenu: function(jsonSupport) {
                    return jsonSupport.getJson();
                }
            }
        })

        .state("main.support.sub", {
            url: "/:url",
            templateUrl: 'sites/support/support_submenu.html',
            controller : 'SupportSubmenuController'
        })

});

support.controller('SupportController', function($scope, smenu) {
    $scope.supportMenu = smenu.data.menu;
});

support.controller('SupportSubmenuController', function($scope, smenu, $stateParams) {
    $scope.supportSubmenu = smenu.data[$stateParams.url];
    $scope.supportSubtitle = $stateParams.url;
});

support.factory('jsonSupport', function($http) {
    var sdo = {
        getJson: function() {
            var promise = $http({ method: 'GET', url: 'sites/support/support.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;
});