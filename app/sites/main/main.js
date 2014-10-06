var app = angular.module('main', ['ui.router', 'ngTouch', 'ngResource', 'ng-iscroll']);

//app.config(function($stateProvider, $urlRouterProvider) {
app.config(function($stateProvider) {
  //$urlRouterProvider.otherwise("/");
  
  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: 'sites/main/main.html',
	  controller : 'MainController',
	  resolve: {
		  items: function(srvMenu) {
			return srvMenu.getNav();
		  },
		  weather: function(srvMenu) {
		  	return srvMenu.getWeather();
		  },
          emergency: function(srvMenu) {
              return srvMenu.getEmergency();
          }
	  }
	  
    })
	
	//$urlRouterProvider.otherwise("");
	//$locationProvider.html5Mode(true);
});

app.config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.run(function($rootScope, $location, $window) {
  $rootScope.go = function (path, pageAnimationClass) {

    if (typeof(pageAnimationClass) === 'undefined') { // Use a default, your choice
        $rootScope.pageAnimationClass = 'slideLeft';
    }
    
    else { // Use the specified animation
        $rootScope.pageAnimationClass = pageAnimationClass;
    }

    if (path === 'back') { // Allow a 'back' keyword to go to previous page
        $window.history.back();
    }
    
    else { // Go to the specified path
        $location.path(path);
    }
  };
});

app.controller('MainController', function($scope, $interval, items, weather, emergency, srvMenu) {
  //$scope.items = [{id : 1, name : 'Popular items', url : 'main.popular'},{id : 2, name : 'Users', url : 'users'},{id : 3, name : 'Your items', url : 'items'}];
  $scope.items = items;
  $scope.weather = weather.data[0];

    if(emergency.data.length > 0) {
        var intervalPromise = $interval(function () {
            $scope.emergency = emergency.data;
            //$scope.showMessages = function(item) {
            //    return item.hasOwnProperty('notify');
            //};
            $scope.showEmergency = function(item) {
                if(item){
                    return true;
                }
                //return item.hasOwnProperty('notify');
            };

        }, 10000, 10);
        $scope.closeEmergency = function () {
            //$scope.$on('destroy', function () {
                $interval.cancel(intervalPromise);
                $scope.showEmergency = function(item) {
                    return false;
                };
            //});
        };

    }




    //function refresh() {
    //    $scope.emergency = emergency.data;
    //}
    //
    //refresh();
    //
    //$interval(function(){
    //    refresh();
    //}, 3000);
    //$interval(function() {
    //    $scope.emergency = emergency.data
    //}, 3000, 10);

    //var emergency_data = emergency.data;
    //$scope.emergency = function(emergency_data){
    //    if(emergency_data.length>=1){
    //        return emergency_data;
    //    }
    //};

  //$scope.state = $state;

  $scope.drawer = function() {
    $scope.isOpen = ! $scope.isOpen;
  };
  $scope.isOpen = true;


});

app.factory('srvMenu', function($http) {
	var sdo = {
		getNav: function() {
			var promise = [
                {id : 1, name : 'Welcome', icon : 'icon-feather', url : 'main'},
                {id : 2, name : 'Directory', icon : 'icon-vcard', url : 'main.directory'},
                {id : 3, name : 'Emergency', icon : 'icon-fire', url : 'main.emergency', notify: true},
                {id : 4, name : 'Support', icon : 'icon-help', url : 'main.support'},
                {id : 5, name : 'Social', icon : 'icon-asl', url : 'main.social'},
                {id : 6, name : 'About', icon : 'icon-info', url : 'main.about'},
                {id : 7, name : 'News', icon : 'icon-newspaper', url : 'main.newscenter'},
                {id : 8, name : 'Visit', icon : 'icon-direction', url : 'main.visit'}
            ];
			return promise;
		},
		getWeather: function() {
			var promise = $http({ method: 'GET', url: 'api/static/weather.json' }).success(function(data, status, headers, config) {
				return data;
			});
			return promise;
		},
        getEmergency: function() {
            var promise = $http({ method: 'GET', url: 'api/static/emergency.json', cache: false }).success(function(data, status, headers, config) {
            //var promise = $http({ method: 'GET', url: 'api/emergency/check', cache: false }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
	}
	return sdo;
});

app.factory('FeedService', function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
});

app.filter('rssDate', function () {
    return function (value) {
        return new Date(value).toLocaleString();
    };
});

app.filter('addPluses', function() {
  return function(name) {
    return name.replace(/\s{1,}/g, '+')
               .replace(/'/g, '')
               .replace(/of/g, '')
               .replace(/\//g, '+');
  }
});

app.filter('removePluses', function() {
  return function(name) {
    return name.replace(/\u002B/g, ' ');
  }
});

app.filter('createAnchors', function ($sce) {
	return function (str) {
		return $sce.trustAsHtml(str.
			replace(/</g, '&lt;').
			replace(/>/g, '&gt;').
			//replace(/(.*)\…/, '').
			replace(/\u2026/, "").
			replace(/(http[^\s]+)/, '<a href="$1" target="_blank">link</a>')
			//replace(/(http[^\s]+)/, '<a href="$1" target="_blank">link</a>')
		);
	}
});

app.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});