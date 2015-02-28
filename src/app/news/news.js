'use strict';

var NewsCtrl = require("./news-controller");

module.exports = angular.module('app.news', [
    'news/news.tpl.html',
    'ui.router',
    'ngTouch',
    'hj.uiSrefFastclick',
    'ngAnimate',
    'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            .state('news', {
                url: '^/news',
                controller: 'NewsCtrl',
                templateUrl: 'news/news.tpl.html',
                data: {
                    pageTitle: 'News'
                },
                resolve: {
                    newsMenu: function(FeedService) {
                        return FeedService.parseFeed('http://news.ucsc.edu/rss/all_activities.xml');
                    }
                }
            })
        ;

    })
    .controller('NewsCtrl', ['$scope', 'newsMenu', NewsCtrl])
;