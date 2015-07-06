var emergency = angular.module('main.emergency', ['main']);

emergency.config(function($stateProvider) {
	$stateProvider

	    .state('main.emergency', {
	        url: '^/emergency',
	        controller: 'EmergencyCtrl',
	        templateUrl: 'emergency/emergency.tpl.html',
	        data: {
	            pageTitle: 'Emergency'
	        },
	        resolve: {
	            emergencyMenu: function (siteMenuService) {
	                return siteMenuService.emergencyMenu();
	            }
        	}
       	})

        .state('main.emergency.contacts', {
            url: "/contacts",
            controller: 'EmergencyContactsCtrl',
            templateUrl: 'emergency/emergency-contacts/emergency-contacts.tpl.html',
            data: {
                pageTitle: 'Emergency Contacts'
            }
        })

        .state("main.emergency.contacts.detail", {
            url: "/:url",
            controller: 'EmergencyContactsDetailCtrl',
            templateUrl: 'emergency/emergency-contacts/emergency-contacts-detail.tpl.html',
            data: {
                pageTitle: 'Detail'
            }
        })

        .state("main.emergency.news", {
            url: "/news",
            controller: 'EmergencyNewsCtrl',
            templateUrl: 'emergency/emergency-news/emergency-news.tpl.html',
            data: {
                pageTitle: 'Emergency News'
            }
        })

       	
		
});

emergency.controller('EmergencyCtrl', function($scope, $state, emergencyMenu) {
  $scope.emergencyMenu = emergencyMenu.data.menu;
  $scope.trackback="main.emergency";
});

emergency.controller('EmergencyContactsCtrl', function($scope, $state, emergencyMenu) {
  $scope.emergencyContacts = emergencyMenu.data.contacts;
  $scope.trackback="main.emergency.contacts";
});

emergency.controller('EmergencyContactsDetailCtrl', function($scope, $state, emergencyMenu, $stateParams) {
  $scope.contact = emergencyMenu.data[$stateParams.url][0];
  $scope.trackback="main.emergency.contacts.detail";
});

emergency.controller('EmergencyNewsCtrl', function($scope, $state, siteMenuService) {
  $scope.trackback="main.emergency.news";

  siteMenuService.emergencyNews().success(function(data){
        $scope.emergencyNews=data;
        //$scope.resultscount=data.length;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
        //$scope.resultscount='0';
    });
});
