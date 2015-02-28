'use strict';

var DirectoryCtrl = require("./directory-controller");
var DirectoryBrowseCtrl = require("./directory-browse/directory-browse-controller");
var DirectorySearchCtrl = require("./directory-search/directory-search-controller");

module.exports = angular.module('app.directory', [
    'directory/directory.tpl.html',
    'directory/directory-browse/directory-browse.tpl.html',
    'directory/directory-search/directory-search.tpl.html',
    'ui.router',
    //'ngTouch',
    //'hj.uiSrefFastclick',
    //'ngAnimate',
    //'anim-in-out'
])
    .config(function config($stateProvider) {

        $stateProvider
            .state('directory', {
                url: '^/directory',
                controller: 'DirectoryCtrl',
                templateUrl: 'directory/directory.tpl.html',
                data: {
                    pageTitle: 'Directory'
                },
                resolve: {
                    directoryMenu: function (siteMenuService) {
                        return siteMenuService.directoryMenu();
                    }
                }
            })
            .state("directory.browse", {
                url: "/browse",
                controller: 'DirectoryBrowseCtrl',
                templateUrl: 'directory/directory-browse/directory-browse.tpl.html',
                data: {
                    pageTitle: 'Browse'
                }
            })

            .state("directory.search", {
                url: "/search",
                controller: 'DirectorySearchCtrl',
                templateUrl: 'directory/directory-search/directory-search.tpl.html',
                data: {
                    pageTitle: 'Directory Search'
                }
            })
        ;

    })
    .controller('DirectoryCtrl', ['$scope', 'directoryMenu', DirectoryCtrl])
    .controller('DirectorySearchCtrl', function($scope, searchFactory) {
        $scope.trackback="directory.search";
        $scope.dquery="";
        //new BaseController($scope);
        $scope.updateSearch = function() {
            var $formatted = $scope.dquery.replace(/\s{1,}/g, '+');
            if($scope.query != '') {
                searchFactory.simpleSearch($formatted).success(function(data){
                    $scope.results=data;
                    $scope.resultscount=data.length;
                    console.log(data);
                }).error(function(data){
                    console.log('ERROR');
                    $scope.test='no';
                });
            } else {
                $scope.results = '';
                $scope.resultscount='0';
            }
        };
    })
    .factory('jsonDirectory', function($http) {
        var sdo = {
            getJson: function() {
                var promise = $http({ method: 'GET', url: 'sites/directory/directory.json' }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
        }
        return sdo;
    })
    .factory('searchFactory', function($http) {
        var urlBase = '//campusdirectory.ucsc.edu/api';
        var searchFactory = {};
        searchFactory.simpleSearch = function (keyword) {
            return $http.jsonp(urlBase + '/search/' + keyword + '&callback=JSON_CALLBACK');
        };
        searchFactory.browsePeople = function (type) {
            return $http.jsonp(urlBase + '/people/' + type + '&callback=JSON_CALLBACK');
        };
        searchFactory.browseSearch = function (type, id) {
            return $http.jsonp(urlBase + '/people/' + type + '/' + id + '&callback=JSON_CALLBACK');
        };
        searchFactory.getDivisions = function () {
            return $http.jsonp(urlBase + '/divisions/' + '&callback=JSON_CALLBACK');
        };
        searchFactory.getDepartments = function () {
            return $http.jsonp(urlBase + '/departments/' + '&callback=JSON_CALLBACK');
        };
        searchFactory.getPerson = function (id) {
            return $http.jsonp(urlBase + '/uid/' + id + '&callback=JSON_CALLBACK');
        };
        return searchFactory;
    })
;