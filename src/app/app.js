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
    //require('./home/home').name,
    //require('./about/about').name,
    //require('./listings/listings').name
    require('./dashboard/dashboard').name,
    require('./emergency/emergency').name

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
    ;
