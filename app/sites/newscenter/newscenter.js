var newscenter = angular.module('main.newscenter', ['main']);

newscenter.config(function($stateProvider) {
    $stateProvider
        .state("main.newscenter", {
            url: "^/news",
            templateUrl: 'sites/newscenter/news_menu.html',
            controller : 'NewscenterController',
            resolve: {
                newscentermenu: function(FeedService) {
                    return FeedService.parseFeed('http://news.ucsc.edu/rss/all_activities.xml');
                }
            }
        })

    //.state("main.news.feed", {
    // url: "/:url",
    // templateUrl: 'sites/news/news_feed.html',
    // controller : 'NewsFeedController'
    //})
    //
    //.state("main.news.feed.detail", {
    //    url: "/:id",
    //    templateUrl: 'sites/news/news_feed_detail.html',
    //    controller : 'NewsFeedDetailController'
    //})
});

newscenter.controller('NewscenterController', function($scope, newscentermenu) {
    //$scope.data = newscentermenu.data.menu;
    $scope.data = newscentermenu.data.responseData.feed.entries;
});

//news.controller('NewsFeedController', function($scope, $stateParams, newsmenu) {
//    var feedurl = newsmenu.data.$stateParams.uid.url;
//    $scope.feed = FeedService.parseFeed(feedurl);
//});
//
//news.controller('NewsFeedDetailController', function($scope, $stateParams, newsmenu) {
//    var feedurl = newsmenu.data.$stateParams.uid.url;
//    $scope.feed = FeedService.parseFeed(feedurl);
//});


//newscenter.factory('jsonNewscenter', function($http) {
//    var sdo = {
//        getJson: function() {
//            var promise = $http({ method: 'GET', url: 'sites/newscenter/newscenter.json' }).success(function(data, status, headers, config) {
//                return data;
//            });
//            return promise;
//        }
//    }
//    return sdo;
//});