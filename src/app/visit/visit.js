'use strict';

var VisitCtrl = require("./visit-controller");

module.exports = angular.module('app.visit', [
    'visit/visit.tpl.html',
    'ui.router',
    'ngTouch',
    'hj.uiSrefFastclick',
    'ngAnimate',
    'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            .state('visit', {
                url: '^/visit',
                controller: 'VisitCtrl',
                templateUrl: 'visit/visit.tpl.html',
                data: {
                    pageTitle: 'Visit'
                },
                resolve: {
                    visitMenu: function (siteMenuService) {
                        return siteMenuService.visitMenu();
                    }
                }
            })
        ;

    })
    .controller('VisitCtrl', ['$scope', 'visitMenu', VisitCtrl])
;