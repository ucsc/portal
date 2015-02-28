'use strict';

var SupportCtrl = require("./support-controller");
var SupportSubmenuCtrl = require("./support-submenu/support-submenu-controller");

module.exports = angular.module('app.support', [
    'support/support.tpl.html',
    'support/support-submenu/support-submenu.tpl.html',
    'ui.router',
    'ngTouch',
    'hj.uiSrefFastclick',
    'ngAnimate',
    'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            .state('support', {
                url: '^/support',
                controller: 'SupportCtrl',
                templateUrl: 'support/support.tpl.html',
                data: {
                    pageTitle: 'Support'
                },
                resolve: {
                    supportMenu: function (siteMenuService) {
                        return siteMenuService.supportMenu();
                    }
                }
            })
            .state("support.submenu", {
                url: "/:url",
                controller: 'SupportSubmenuCtrl',
                templateUrl: 'support/support-submenu/support-submenu.tpl.html',
                data: {
                    pageTitle: 'Support'
                }
            })
        ;

    })
    .controller('SupportCtrl', ['$scope', 'supportMenu', SupportCtrl])
    //.controller('SupportSubmenuCtrl', ['$scope', 'supportMenu', SupportSubmenuCtrl])
    .controller('SupportSubmenuCtrl', function ($scope, $stateParams, supportMenu) {
        $scope.contacts = supportMenu.data[$stateParams.url];
        $scope.pagetitle = $stateParams.url;
    })
;