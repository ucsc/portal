'use strict';

var NewsCtrl = require("./news-controller");
var NewsFeedCtrl = require("./news-feed/news-feed-controller");

module.exports = angular.module('app.news', [
    'news/news.tpl.html',
    'news/news-feed/news-feed.tpl.html',
    'ui.router',
    //'ngTouch',
    //'hj.uiSrefFastclick',
    //'ngAnimate',
    //'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            //.state('news', {
            //    url: '^/news',
            //    controller: 'NewsCtrl',
            //    templateUrl: 'news/news.tpl.html',
            //    data: {
            //        pageTitle: 'News'
            //    },
            //    resolve: {
            //        newsMenu: function(FeedService) {
            //            return FeedService.parseFeed('http://news.ucsc.edu/rss/all_activities.xml');
            //        }
            //    }
            //})

            .state('news', {
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
            .state("news.feed", {
                url: "/:url",
                controller: 'NewsFeedCtrl',
                templateUrl: 'news/news-feed/news-feed.tpl.html',
                data: {
                    pageTitle: 'News Feed'
                }
            })
        ;

    })
    .controller('NewsCtrl', ['$scope', 'newsMenu', NewsCtrl])
    .controller('NewsFeedCtrl', function ($scope, $stateParams, newsMenu, FeedService) {
        var NewsFeedUrl = newsMenu.data[$stateParams.url][0].feed;
        FeedService.parseFeed(NewsFeedUrl).success(function(data){
            $scope.articles=data.responseData.feed.entries;
            //$scope.resultscount=data.length;
            console.log(data);
        }).error(function(data){
            console.log('ERROR');
            //$scope.resultscount='0';
        });
        $scope.feedtitle = newsMenu.data[$stateParams.url][0].title;
    })
;