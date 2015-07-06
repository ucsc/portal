var support = angular.module('main.support', ['main']);

support.config(function($stateProvider) {
	$stateProvider

	    .state('main.support', {
	        url: '^/support',
	        controller: 'SupportCtrl',
	        templateUrl: 'support/support.tpl.html',
	        data: {
	            pageTitle: 'Support'
	        },
	        resolve: {
	            supportMenu: function (siteMenuService) {
	                return siteMenuService.supportMenu();
	            }
        	}
      	})

      	.state("main.support.submenu", {
            url: "/:url",
            controller: 'SupportSubmenuCtrl',
            templateUrl: 'support/support-submenu.tpl.html',
            data: {
                pageTitle: 'Support submenu'
            }
        })
		
});

support.controller('SupportCtrl', function($scope, $state, supportMenu) {
  $scope.supportMenu = supportMenu.data.menu;
  $scope.trackback="main.support";
});

support.controller('SupportSubmenuCtrl', function($scope, $state, $stateParams, supportMenu) {
  $scope.contacts = supportMenu.data[$stateParams.url];
  $scope.pagetitle = $stateParams.url;
  $scope.trackback="main.support.submenu";
});