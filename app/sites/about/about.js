var about = angular.module('main.about', ['main']);

about.config(function($stateProvider) {
    $stateProvider
        .state("main.about", {
            url: "^/about",
            templateUrl: 'sites/about/about_menu.html',
            controller : 'AboutController',
            resolve: {
                aboutmenu: function(jsonAbout) {
                    return jsonAbout.getJson();
                }
            }
        })

});

about.controller('AboutController', function($scope, aboutmenu) {
    $scope.aboutMenu = aboutmenu.data.menu;
});

about.factory('jsonAbout', function($http) {
    var sdo = {
        getJson: function() {
            var promise = $http({ method: 'GET', url: 'sites/about/about.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;
});