'use strict';

var SocialCtrl = require("./social-controller");

module.exports = angular.module('app.social', [
    'social/social.tpl.html',
    'ui.router',
    'ngTouch',
    'hj.uiSrefFastclick',
    'ngAnimate',
    'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            .state('social', {
                url: '^/social',
                controller: 'SocialCtrl',
                templateUrl: 'social/social.tpl.html',
                data: {
                    pageTitle: 'Social'
                },
                resolve: {
                    socialMenu: function (siteMenuService) {
                        return siteMenuService.socialMenu();
                    }
                }
            })
        ;

    })
    .controller('SocialCtrl', ['$scope', 'socialMenu', SocialCtrl])
;