var visit = angular.module('main.visit', ['main']);

visit.config(function($stateProvider) {
	$stateProvider

	    .state('main.visit', {
	        url: '^/visit',
	        controller: 'VisitCtrl',
	        templateUrl: 'visit/visit.tpl.html',
	        data: {
	            pageTitle: 'Visit'
	        },
	        resolve: {
	            visitMenu: function (siteMenuService) {
	                return siteMenuService.visitMenu();
	            }
        	}
      })
		
});

visit.controller('VisitCtrl', function($scope, $state, visitMenu) {
  $scope.visitMenu = visitMenu.data.menu;
  $scope.trackback="main.visit";
});