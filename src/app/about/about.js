'use strict';

var AboutCtrl = require("./about-controller");

module.exports = angular.module('app.about', [
    'about/about.tpl.html',
    'ui.router',
    'ngTouch',
    'hj.uiSrefFastclick',
    'ngAnimate',
    'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            .state('about', {
                url: '^/about',
                controller: 'AboutCtrl',
                templateUrl: 'about/about.tpl.html',
                data: {
                    pageTitle: 'About'
                },
                resolve: {
                    aboutMenu: function (siteMenuService) {
                        return siteMenuService.aboutMenu();
                    }
                }
            })
        ;

    })
    .controller('AboutCtrl', ['$scope', 'aboutMenu', AboutCtrl])
;