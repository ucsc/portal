var social = angular.module('main.social', ['main']);

social.config(function($stateProvider) {
	$stateProvider

	    .state('main.social', {
	        url: '^/social',
	        controller: 'SocialCtrl',
	        templateUrl: 'social/social.tpl.html',
	        data: {
	            pageTitle: 'Social'
	        },
	        resolve: {
	            socialMenu: function (siteMenuService) {
	                return siteMenuService.socialMenu();
	            }
        	}
      })
		
});

social.controller('SocialCtrl', function($scope, $state, socialMenu) {
  $scope.socialMenu = socialMenu.data.menu;
  $scope.trackback="main.social";
});