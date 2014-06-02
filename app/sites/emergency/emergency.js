var emergency = angular.module('main.emergency', ['main']);

emergency.config(function($stateProvider) {	
	$stateProvider
	    .state("main.emergency", {
	      url: "^/emergency",
	      templateUrl: 'sites/emergency/emergency_menu.html',
		  controller : 'EmergencyController',
		  resolve: {
			  emenu: function(jsonEmergency) {
				  return jsonEmergency.getJson();
			  }
		  }
	    })

	    .state("main.emergency.contacts", {
	      url: "/contacts",
	      templateUrl: 'sites/emergency/emergency_contacts.html',
		  controller : 'EcontactsController'
	    })
		
	    .state("main.emergency.contacts.contact-detail", {
	      url: "/:url",
	      templateUrl: 'sites/emergency/emergency_contact_detail.html',
	      controller : 'EcontactController'
	    })

	    .state("main.emergency.news", {
	      url: "/news",
	      templateUrl: 'sites/emergency/emergency_news.html',
		  controller : 'EnewsController',
		  resolve: {
			  enews: function(FeedService) {
				  //return FeedService.parseFeed('http://news.ucsc.edu/rss/administrative_message.xml');
				  //return FeedService.parseFeed('http://news.ucsc.edu/rss/emergency.xml');
				  return FeedService.parseFeed('http://www.rssitfor.me/getrss?name=ucsc_cruzalert');
			  }
		  }
	    })

	    .state("main.emergency.detail", {
	      url: "/detail",
	      templateUrl: 'sites/emergency/emergency_detail.html',
	    })
});

emergency.controller('EnewsController', function($scope, enews) {
  $scope.feeds = enews.data.responseData.feed.entries;
});

emergency.controller('EmergencyController', function($scope, emenu) {
  $scope.data = emenu.data.menu;
});

emergency.controller('EcontactsController', function($scope, emenu) {
  $scope.contacts = emenu.data.contacts;
});

emergency.controller('EcontactController', function($scope, emenu, $stateParams) {
  $scope.contact = emenu.data[$stateParams.url][0];
});

emergency.factory('jsonEmergency', function($http) {
	var sdo = {
		getJson: function() {
			var promise = $http({ method: 'GET', url: 'sites/emergency/emergency.json' }).success(function(data, status, headers, config) {
				return data;
			});
			return promise;
		}
	}
	return sdo;
});