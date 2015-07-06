var about = angular.module('main.about', ['main']);

about.config(function($stateProvider) {
	$stateProvider

	    .state('main.about', {
	        url: '^/about',
	        controller: 'AboutCtrl',
	        templateUrl: 'about/about.tpl.html',
	        data: {
	            pageTitle: 'About'
	        },
	        resolve: {
	            aboutMenu: function (siteMenuService) {
	                return siteMenuService.aboutMenu();
	            }
        	}
      })
		
});

about.controller('AboutCtrl', function($scope, $state, aboutMenu) {
  $scope.aboutMenu = aboutMenu.data.menu;
  $scope.trackback="main.about";
});