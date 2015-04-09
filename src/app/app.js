'use strict';

require('angular');
require('angular-touch');
require('angular-ui-router');
require('angular-animate');
require('angular-ui-sref-fastclick');
require('angular-ui-router-anim-in-out');
require('../../build/templates');

// Import app controllers
var AppCtrl = require('./app-controller');
var SideNavCtrl = require('./navigation/sidenav/sidenav-controller');
var TopNavCtrl = require('./navigation/topnav/topnav-controller');

// Import app services
var navigationService = require('./components/navigation-service');
var siteMenuService = require('./components/siteMenu-service');

module.exports = angular.module('app', [
    'ui.router',
    'hj.uiSrefFastclick',
    'ngAnimate',
    'ngTouch',
    'anim-in-out',

    // Add modules/sections as dependencies
    require('./dashboard/dashboard').name,
    require('./emergency/emergency').name,
    require('./directory/directory').name,
    require('./news/news').name,
    require('./support/support').name,
    require('./about/about').name,
    require('./social/social').name,
    require('./visit/visit').name

])

    .config(function myAppConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    })

    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])
    .controller('AppCtrl', ['$scope', '$http', AppCtrl])
    .controller('SideNavCtrl', ['$scope', '$http', 'navigationService', SideNavCtrl])
    .controller('TopNavCtrl', ['$scope', '$http', TopNavCtrl])
    .factory('navigationService', ['$http', navigationService])
    .factory('siteMenuService', ['$http', siteMenuService])
    .factory('FeedService', function($http){
        return {
            parseFeed : function(url){
                return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            }
        }
    })
    .directive("currentTime", function (dateFilter) {
        return function (scope, element, attrs) {
            function updateTime() {
                var dt = dateFilter(new Date(), attrs.currentTime, 'UTC' + 'Z');
                element.text(dt);
            }
            function updateLater() {
                updateTime(); // load
                setTimeout(function () {
                    updateTime(); // update DOM
                    updateLater(); // schedule another update
                }, 1000);
            }
            updateLater();
        }
    })
    .filter('createAnchors', function ($sce) {
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
    })
    .filter('rssDate', function () {
        return function (value) {
        return new Date(value).toLocaleString();
        };
    })
    .filter('addPluses', function() {
        return function(name) {
            return name.replace(/\s{1,}/g, '+')
                .replace(/'/g, '')
                .replace(/of/g, '')
                .replace(/\//g, '+');
        }
    })
;
