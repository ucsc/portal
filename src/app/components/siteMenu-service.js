module.exports = function siteMenuService($http) {

    var sdo = {
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
        }
    }
    return sdo;

};