var social = angular.module('main.social', ['main']);

social.config(function($stateProvider) {
    $stateProvider
        .state("main.social", {
            url: "^/social",
            templateUrl: 'sites/social/social_menu.html',
            controller : 'SocialController',
            resolve: {
                snmenu: function(jsonSocial) {
                    return jsonSocial.getJson();
                }
            }
        })

});

social.controller('SocialController', function($scope, snmenu) {
    $scope.socialMenu = snmenu.data.menu;
});

social.factory('jsonSocial', function($http) {
    var sdo = {
        getJson: function() {
            var promise = $http({ method: 'GET', url: 'sites/social/social.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;
});