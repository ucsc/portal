var main = angular.module('main', [
  // 'ngRoute',
  'ui.router',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);

main.config(function($stateProvider, $locationProvider) {
  // $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});

  $stateProvider.state('main', {
  	// abstract: true,
  	url: '/',
  	controller : 'MainController',
  	templateUrl: 'main/main.tpl.html',
    data: {
    	pageTitle: 'Dashboard'
    }
  })
  ;

});

main.config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
});

main.config(function( $compileProvider ) { 
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
    // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
});

main.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.navbarshow = function() {
        $rootScope.isTop = !$rootScope.isTop;
    };
    $rootScope.isTop = true;
});

main.controller('MainController', function($scope, navigationService, siteMenuService) {
  siteMenuService.mainMenu().success(function(data){
        $scope.mainMenu=data.menu;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
    });


   navigationService.getForecast().success(function(data){
        $scope.forecast=data;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
    });
});

main.filter('day', function () {
    return function (value) {
        return new Date(value);
    };
});