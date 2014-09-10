var directory = angular.module('main.directory', ['main']);

directory.config(function($stateProvider) {	
	$stateProvider
	    .state("main.directory", {
	      url: "^/directory",
	      templateUrl: 'sites/directory/directory_menu.html',
		  controller : 'DirectoryController',
		  resolve: {
			  dmenu: function(jsonDirectory) {
				  return jsonDirectory.getJson();
			  }
		  }
	    })

	    .state("main.directory.search", {
	      url: "/search",
	      templateUrl: 'sites/directory/directory_search.html',
		  controller : 'DirectorySearchController',
		  /*resolve: {
			  dsearch: function(FeedService) {
				  return FeedService.parseFeed('http://www.rssitfor.me/getrss?name=ucsc_cruzalert');
			  }
		  }*/
	    })

	    .state("main.directory.search.person", {
	      url: "/:uid",
	      templateUrl: 'sites/directory/directory_people_person.html',
	      controller : 'DirectoryPeoplePersonController'
	    })

	    .state("main.directory.browse", {
	      url: "/browse",
	      templateUrl: 'sites/directory/directory_people.html',
		  controller : 'DirectoryPeopleController'
	    })

	    .state("main.directory.browse.division", {
	      url: "/:url",
	      templateUrl: 'sites/directory/directory_people_division.html',
	      controller : 'DirectoryPeopleDivisionController'
	    })

	    .state("main.directory.browse.division.person", {
	      url: "/:uid",
	      templateUrl: 'sites/directory/directory_people_person.html',
	      controller : 'DirectoryPeoplePersonController'
	    })

});

directory.controller('DirectoryController', function($scope, dmenu) {
  $scope.directoryMenu = dmenu.data.menu;
});

directory.controller('DirectoryPeopleController', function($scope, dmenu, searchFactory) {
  //$scope.directoryPeople = dmenu.data.people;

  searchFactory.getDivisions().success(function(data){
    		$scope.directoryPeople=data;
  			$scope.resultscount=data.length;
  			console.log(data);
    }).error(function(data){
    		console.log('ERROR');
    		$scope.resultscount='0';
    });

});

directory.controller('DirectoryPeopleDivisionController', function($scope, dmenu, $stateParams, searchFactory) {
  //$scope.directoryTypes = dmenu.data[$stateParams.url];
  $scope.pagename = $stateParams.url;
  $scope.trackback="main.directory.browse.division";

  searchFactory.browseSearch('Staff+&+Faculty',$stateParams.url).success(function(data){
    		$scope.directoryTypes=data;
  			$scope.resultscount=data.length;
  			console.log(data);
    }).error(function(data){
    		console.log('ERROR');
    		$scope.resultscount='0';
    });
});

directory.controller('DirectoryPeoplePersonController', function($scope, $stateParams, searchFactory) {
  //$scope.directoryTypes = dmenu.data[$stateParams.url];
  $scope.pagename = $stateParams.uid;

  searchFactory.getPerson($stateParams.uid).success(function(data){
    		$scope.person=data;
  			//$scope.resultscount=data.length;
  			console.log(data);
    }).error(function(data){
    		console.log('ERROR');
    		//$scope.resultscount='0';
    });
});

directory.controller('DirectorySearchController', function($scope, searchFactory) {
	$scope.trackback="main.directory.search";

	$scope.updateSearch = function() {
		$formatted = $scope.query.replace(/\s{1,}/g, '+');
	    if($scope.query != '') {
    		searchFactory.simpleSearch($formatted).success(function(data){
    			$scope.results=data;
  				$scope.resultscount=data.length;
  				console.log(data);
    		}).error(function(data){
    			console.log('ERROR');
    			$scope.test='no';
    		});
	    } else {
	        $scope.results = '';
	        $scope.resultscount='0';
	    }
	};
});

directory.factory('jsonDirectory', function($http) {
	var sdo = {
		getJson: function() {
			var promise = $http({ method: 'GET', url: 'sites/directory/directory.json' }).success(function(data, status, headers, config) {
				return data;
			});
			return promise;
		}
	}
	return sdo;
});

directory.factory('searchFactory', function($http) {

    var urlBase = '//campusdirectory.ucsc.edu/api';
    //var urlBase = 'sites/directory/testing.json';
    var searchFactory = {};

    searchFactory.simpleSearch = function (keyword) {
        //return $http.get(urlBase + '/search/' + keyword);
        //return $http.get(urlBase);
        return $http.jsonp(urlBase + '/search/' + keyword + '&callback=JSON_CALLBACK');
    };

    searchFactory.browsePeople = function (type) {
        return $http.jsonp(urlBase + '/people/' + type + '&callback=JSON_CALLBACK');
    };

    searchFactory.browseSearch = function (type, id) {
        return $http.jsonp(urlBase + '/people/' + type + '/' + id + '&callback=JSON_CALLBACK');
    };

    searchFactory.getDivisions = function () {
        return $http.jsonp(urlBase + '/divisions/' + '&callback=JSON_CALLBACK');
    };

    searchFactory.getDepartments = function () {
        return $http.jsonp(urlBase + '/departments/' + '&callback=JSON_CALLBACK');
    };

    searchFactory.getPerson = function (id) {
        return $http.jsonp(urlBase + '/uid/' + id + '&callback=JSON_CALLBACK');
    };

    return searchFactory;
});