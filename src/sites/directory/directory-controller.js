var directory = angular.module('main.directory', ['main']);

directory.config(function($stateProvider) {
	$stateProvider
	    // .state("main.directory", {
	    //   url: "^/directory",
	    //   templateUrl: 'directory/directory.tpl.html'
		  
	    // })

	    .state('main.directory', {
	        url: '^/directory',
	        controller: 'DirectoryCtrl',
	        templateUrl: 'directory/directory.tpl.html',
	        data: {
	            pageTitle: 'Directory'
	        },
	        resolve: {
	            directoryMenu: function (siteMenuService) {
	                return siteMenuService.directoryMenu();
	            }
        	}
       	})

       	.state('main.directory.search', {
            url: "/search",
            controller: 'DirectorySearchCtrl',
            templateUrl: 'directory/directory-search/directory-search.tpl.html',
            data: {
                pageTitle: 'Directory Search'
            }
        })

        .state("main.directory.search.person", {
            url: "/:uid",
            controller: 'DirectorySearchPersonCtrl',
            templateUrl: 'directory/directory-search/directory-search-person.tpl.html',
            data: {
                pageTitle: 'Detail'
            }
        })

        .state("main.directory.browse", {
            url: "/browse",
            controller: 'DirectoryBrowseCtrl',
            templateUrl: 'directory/directory-browse/directory-browse.tpl.html',
            data: {
                pageTitle: 'Browse'
            }
        })

        .state("main.directory.browse.division", {
            url: "/:url",
            controller: 'DirectoryBrowseDivisionCtrl',
            templateUrl: 'directory/directory-browse/directory-browse-division.tpl.html',
            data: {
                pageTitle: 'Division'
            }
        })

        .state("main.directory.browse.division.person", {
            url: "/:uid",
            controller: 'DirectoryBrowseDivisionPersonCtrl',
            templateUrl: 'directory/directory-search/directory-search-person.tpl.html',
            data: {
                pageTitle: 'What'
            }
        })
		
});

directory.controller('DirectoryCtrl', function($scope, $state, directoryMenu) {
  $scope.directoryMenu = directoryMenu.data.menu;
  $scope.trackback="main.directory";
});

directory.controller('DirectorySearchCtrl', function($scope, $state, searchFactory) {
    $scope.trackback="main.directory.search";
    $scope.dquery="";
    //new BaseController($scope);
    $scope.updateSearch = function() {
        var $formatted = $scope.dquery.replace(/\s{1,}/g, '+');
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

directory.controller('DirectorySearchPersonCtrl', function($scope, $state, $stateParams, searchFactory) {
    $scope.pagename = $stateParams.uid;
    $scope.trackback="main.directory.search.person";
    $scope.backlink="main.directory.search";

    searchFactory.getPerson($stateParams.uid).success(function(data){
        $scope.person=data;
        //$scope.resultscount=data.length;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
        //$scope.resultscount='0';
    });

});

directory.controller('DirectoryBrowseCtrl', function($scope, $state, searchFactory) {
    $scope.trackback="main.directory.browse";
    searchFactory.getDivisions().success(function(data){
        $scope.divisions=data.ucscdirectoryelementoptions;
        $scope.resultscount=data.length;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
        $scope.resultscount='0';
    });

});

directory.controller('DirectoryBrowseDivisionCtrl', function($scope, $state, $stateParams, searchFactory) {
    $scope.trackback="main.directory.browse.division";
    $scope.title = $stateParams.url;
    searchFactory.browseSearch('Staff+&+Faculty',$stateParams.url).success(function(data){
        $scope.results=data;
        $scope.resultscount=data.length;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
        $scope.resultscount='0';
    });
});

directory.controller('DirectoryBrowseDivisionPersonCtrl', function($scope, $state, $stateParams, searchFactory) {
    $scope.pagename = $stateParams.uid;
    $scope.trackback="main.directory.browse.division.person";
    $scope.backlink="main.directory.browse.division";

    searchFactory.getPerson($stateParams.uid).success(function(data){
        $scope.person=data;
        //$scope.resultscount=data.length;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
        //$scope.resultscount='0';
    });

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
    var urlBase = 'https://campusdirectory.ucsc.edu/api';
    var searchFactory = {};
    searchFactory.simpleSearch = function (keyword) {
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