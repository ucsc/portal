var app = angular.module('UCSCMobile', ['main','main.test','main.directory','main.emergency','main.news','main.social','main.support','main.visit','main.about','main.events','main.library','main.map']);

// app.config(function($stateProvider, $locationProvider) {
//   $stateProvider.state('app', {
//     abstract: true,
//     controller : 'AppController',
//     resolve: {
//         mainMenu: function (siteMenuService) {
//             return siteMenuService.mainMenu();
//         }
//     }
//   })
//   ;

// });

// app.controller('AppController', function($scope, mainMenu) {
//   $scope.mainMenu = mainMenu.data.menu;
// });

app.factory('siteMenuService', function($http) {
	var sdo = {
        mainMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/main.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        emergencyMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/emergency.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        supportMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/support.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        aboutMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/about.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        visitMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/visit.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        socialMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/social.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        newsMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/news.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        emergencyNews: function() {
            var promise = $http({ method: 'GET', url: '/api/index.php/emergency' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        directoryMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/directory.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        eventsMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/events.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        libraryMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/library.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        mapTransit: function() {
            var promise = $http({ method: 'GET', url: 'api/static/maps/transit.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        mapRestrooms: function() {
            var promise = $http({ method: 'GET', url: 'api/static/maps/restrooms.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        mapParking: function() {
            var promise = $http({ method: 'GET', url: 'api/static/maps/parking.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;
});

app.factory('navigationService', function($http) {
	var sdo = {
        getNav: function() {
            var promise = [
                //{id : 1, name : 'Dashboard', icon : 'icon-feather', url : 'dashboard'},
                {id : 1, name : 'Emergency', icon : 'icon-fire', url : 'emergency'},
                {id : 2, name : 'Directory', icon : 'icon-vcard', url : 'directory'},
                {id : 3, name : 'News', icon : 'icon-newspaper', url : 'news'},
                {id : 4, name : 'Support', icon : 'icon-help', url : 'support'},
                {id : 5, name : 'About', icon : 'icon-info', url : 'about'},
                {id : 6, name : 'Social', icon : 'icon-asl', url : 'social'},
                {id : 7, name : 'Visit', icon : 'icon-direction', url : 'visit'}
                //{id : 1, name : 'Welcome', icon : 'icon-feather', url : 'main'},
                //{id : 2, name : 'Directory', icon : 'icon-vcard', url : 'main.directory'},
                //{id : 3, name : 'Emergency', icon : 'icon-fire', url : 'main.emergency', notify: true},
                //{id : 4, name : 'Support', icon : 'icon-help', url : 'main.support'},
                //{id : 5, name : 'Social', icon : 'icon-asl', url : 'main.social'},
                //{id : 6, name : 'About', icon : 'icon-info', url : 'main.about'},
                //{id : 7, name : 'News', icon : 'icon-newspaper', url : 'main.newscenter'},
                //{id : 8, name : 'Visit', icon : 'icon-direction', url : 'main.visit'},
                //{id : 8, name : 'News', icon : 'icon-newspaper', url : 'main.news'}
            ];
            return promise;
        },
        getForecast: function() {
            var promise = $http({ method: 'GET', url: 'api/static/forecast.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        //getWeather: function() {
        //    var promise = $http({ method: 'GET', url: 'api/static/weather.json' }).success(function(data, status, headers, config) {
        //        return data;
        //    });
        //    return promise;
        //},
        getEmergency: function() {
            var promise = $http({ method: 'GET', url: 'api/static/emergency.json', cache: false }).success(function(data, status, headers, config) {
                //var promise = $http({ method: 'GET', url: 'api/emergency/check', cache: false }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;
});

app.filter('addPluses', function() {
    return function(name) {
        return name.replace(/\s{1,}/g, '+')
            .replace(/'/g, '')
            .replace(/of/g, '')
            .replace(/\//g, '+');
    }
});

app.filter('removePluses', function() {
    return function(name) {
        return name.replace(/\+/g, ' ');
    }
});

app.filter('jsonTidy', function() {
    return function(name) {
        return name.replace(/â€™/g, '\u2019');
    }
});

app.factory('FeedService', function($http){
    return {
        parseFeed : function(url){
            //return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            return $http({
                method: "JSONP",
                //params: params,
                url: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url),
                headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Accept-Charset":"charset=utf-8"
                },
                callback: 'JSON_CALLBACK',
                isArray: false
            });
        }
    }
});

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter('createAnchors', function ($sce) {
    return function (str) {
	    return $sce.trustAsHtml(str.
	            replace(/</g, '&lt;').
	            replace(/>/g, '&gt;').
	            replace(/â€™/g, '\u2019').
	            replace(/â€˜/g, '\u0027').
	            replace(/â€”/g, '\u2013').
	            replace(/â€“/g, '\u2013').
	            // replace(/\sâ€\s/g, '\u2013').
	            replace(/â€œ(\w+)/g, '\u201C$1').
	            replace(/â€/g, '\u201D').
	            // replace(/(\s)â€/g, '$1\u2013').
	            // replace(/ â€ /g, '\u2013').
	            // replace(/\u2026/, "").
	            replace(/(http[^\s]+)/, '<a href="$1" target="_blank">link</a>')
	    );
    }
});

app.filter('stripAnchors', function ($sce) {
    return function (str) {
        return $sce.trustAsHtml(str.
                replace(/</g, '&lt;').
                replace(/>/g, '&gt;').
                replace(/â€™/g, '\u2019').
                replace(/â€˜/g, '\u0027').
                replace(/â€”/g, '\u2013').
                replace(/â€“/g, '\u2013').
                // replace(/\sâ€\s/g, '\u2013').
                replace(/â€œ(\w+)/g, '\u201C$1').
                replace(/â€/g, '\u201D').
                // replace(/(\s)â€/g, '$1\u2013').
                // replace(/ â€ /g, '\u2013').
                // replace(/\u2026/, "").
                replace(/(http[^\s]+)/, '')
        );
    }
});

app.filter('rssDate', function () {
    return function (value) {
    return new Date(value).toLocaleString();
    };
});

app.directive("currentTime", function (dateFilter) {
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
});