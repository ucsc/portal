var library = angular.module('main.library', ['main']);

library.config(function($stateProvider) {
	$stateProvider

	    .state('main.library', {
	        url: '^/library',
	        controller: 'LibraryCtrl',
	        templateUrl: 'library/library.tpl.html',
	        data: {
	            pageTitle: 'Library'
	        },
	        resolve: {
	            libraryMenu: function (siteMenuService) {
	                return siteMenuService.libraryMenu();
	            }
        	}
      })
		
});

library.controller('LibraryCtrl', function($scope, $state, libraryMenu) {
  $scope.libraryMenu = libraryMenu.data.menu;
  $scope.trackback="main.library";
});