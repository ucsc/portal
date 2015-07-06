var news = angular.module('main.news', ['main']);

news.config(function($stateProvider) {
	$stateProvider

	    .state('main.news', {
	        url: '^/news',
	        controller: 'NewsCtrl',
	        templateUrl: 'news/news.tpl.html',
	        data: {
	            pageTitle: 'News'
	        },
	        resolve: {
	            newsMenu: function (siteMenuService) {
	                return siteMenuService.newsMenu();
	            }
        	}
      })

      .state("main.news.feed", {
          url: "/:url",
          controller: 'NewsFeedCtrl',
          templateUrl: 'news/news-feed.tpl.html',
          data: {
              pageTitle: 'News Feed'
          }
      })
		
});

news.controller('NewsCtrl', function($scope, $state, newsMenu) {
  $scope.newsMenu = newsMenu.data.menu;
  $scope.trackback="main.news";
});

news.controller('NewsFeedCtrl', function($scope, $state, $stateParams, newsMenu, FeedService) {
  $scope.trackback="main.news.feed";
  var NewsFeedUrl = newsMenu.data[$stateParams.url][0].feed;
  FeedService.parseFeed(NewsFeedUrl).success(function(data, status, headers, config){
      $scope.articles=data.responseData.feed.entries;
      //$scope.resultscount=data.length;
      console.log(data);
  }).error(function(data, status, headers, config){
      console.log('ERROR');
      //$scope.resultscount='0';
  });
  $scope.feedtitle = newsMenu.data[$stateParams.url][0].title;
});