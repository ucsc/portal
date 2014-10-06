var news = angular.module('main.news', ['main']);

news.config(function($stateProvider) {
	$stateProvider
	    .state("main.news", {
	      url: "^/news",
	      templateUrl: 'sites/news/news_menu.html',
		  controller : 'NewsController',
		  resolve: {
			  newsmenu: function(jsonNews) {
				  return jsonNews.getJson();
			  }
		  }
	    })
		
        .state("main.news.feed", {
	     url: "/:url",
	     templateUrl: 'sites/news/news_feed.html',
	     controller : 'NewsFeedController'
        })

        .state("main.news.feed.detail", {
            url: "/:id",
            templateUrl: 'sites/news/news_feed_detail.html',
            controller : 'NewsFeedDetailController'
        })
});

news.controller('NewsController', function($scope, newsmenu) {
  $scope.data = newsmenu.data.menu;
});

news.controller('NewsFeedController', function($scope, $stateParams, newsmenu, FeedService) {
    var feedname = $stateParams.url;
    $scope.newsfeedtitle = feedname;
    echo newsmenu.data.feedname.feed;
    //var feedurl = newsmenu.data.feedname.feed;
    //$scope.feed = FeedService.parseFeed(feedurl);
});

news.controller('NewsFeedDetailController', function($scope, $stateParams, newsmenu) {
    var feedurl = newsmenu.data.$stateParams.uid.url;
    $scope.feed = FeedService.parseFeed(feedurl);
});


news.factory('jsonNews', function($http) {
	var sdo = {
		getJson: function() {
			var promise = $http({ method: 'GET', url: 'sites/news/news.json' }).success(function(data, status, headers, config) {
				return data;
			});
			return promise;
		}
	}
	return sdo;
});