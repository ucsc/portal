'use strict';

var DashboardCtrl = require("./dashboard-controller");

module.exports = angular.module('app.dashboard', [
    'dashboard/dashboard.tpl.html',
    'ui.router',
    'ngTouch',
    'hj.uiSrefFastclick'
])
    .config(function config($stateProvider) {

        $stateProvider.state('dashboard', {
            url: '/',
            controller: 'DashboardCtrl',
            templateUrl: 'dashboard/dashboard.tpl.html',
            data: {
                pageTitle: 'Dashboard'
            }
        });

    })
    .controller('DashboardCtrl', ['$scope', DashboardCtrl]);