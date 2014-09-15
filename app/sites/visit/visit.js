var visit = angular.module('main.visit', ['main']);

visit.config(function($stateProvider) {
    $stateProvider
        .state("main.visit", {
            url: "^/visit",
            templateUrl: 'sites/visit/visit_menu.html',
            controller : 'VisitController',
            resolve: {
                visitmenu: function(jsonVisit) {
                    return jsonVisit.getJson();
                }
            }
        })

});

visit.controller('VisitController', function($scope, visitmenu) {
    $scope.visitMenu = visitmenu.data.menu;
});

visit.factory('jsonVisit', function($http) {
    var sdo = {
        getJson: function() {
            var promise = $http({ method: 'GET', url: 'sites/visit/visit.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;
});