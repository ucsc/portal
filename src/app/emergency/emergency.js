'use strict';

var EmergencyCtrl = require("./emergency-controller");
var EmergencyContactsCtrl = require("./emergency-contacts/emergency-contacts-controller");
var EmergencyContactsDetailCtrl = require("./emergency-contacts/emergency-contacts-detail-controller");
var EmergencyNewsCtrl = require("./emergency-news/emergency-news-controller");

module.exports = angular.module('app.emergency', [
    'emergency/emergency.tpl.html',
    'emergency/emergency-contacts/emergency-contacts.tpl.html',
    'emergency/emergency-contacts/emergency-contacts-detail.tpl.html',
    'emergency/emergency-news/emergency-news.tpl.html',
    'ui.router',
    'ngTouch',
    'hj.uiSrefFastclick',
    'ngAnimate',
    'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            .state('emergency', {
                url: '^/emergency',
                controller: 'EmergencyCtrl',
                templateUrl: 'emergency/emergency.tpl.html',
                data: {
                    pageTitle: 'Emergency'
                },
                resolve: {
                    emergencyMenu: function (siteMenuService) {
                        return siteMenuService.emergencyMenu();
                    }
                }
            })
            .state("emergency.contacts", {
                url: "/contacts",
                controller: 'EmergencyContactsCtrl',
                templateUrl: 'emergency/emergency-contacts/emergency-contacts.tpl.html',
                data: {
                    pageTitle: 'Emergency Contacts'
                }
            })
            .state("emergency.contacts.contact-detail", {
                url: "/:url",
                controller: 'EmergencyContactsDetailCtrl',
                templateUrl: 'emergency/emergency-contacts/emergency-contacts-detail.tpl.html',
                data: {
                    pageTitle: 'Detail'
                }
            })
            .state("emergency.news", {
                url: "/news",
                controller: 'EmergencyNewsCtrl',
                templateUrl: 'emergency/emergency-news/emergency-news.tpl.html',
                data: {
                    pageTitle: 'Emergency News'
                }
            })
        ;

    })
    .controller('EmergencyCtrl', ['$scope', 'emergencyMenu', EmergencyCtrl])
    //.controller('EmergencyCtrl', ['$scope', 'siteMenuService', EmergencyCtrl])
    .controller('EmergencyNewsCtrl', ['$scope', 'siteMenuService', EmergencyNewsCtrl])
    .controller('EmergencyContactsCtrl', ['$scope', 'emergencyMenu', EmergencyContactsCtrl])
    //.controller('EmergencyContactsDetailCtrl', ['$scope', 'emergencyMenu', '$stateParams', EmergencyContactsCtrl])
    .controller('EmergencyContactsDetailCtrl', function ($scope, $stateParams, emergencyMenu) {
        $scope.contact = emergencyMenu.data[$stateParams.url][0];
        //$scope.testing = $stateParams.url;
    })
;