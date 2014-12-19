module.exports = function siteMenuService($http) {

    var sdo = {
        emergencyMenu: function() {
            var promise = $http({ method: 'GET', url: '/api/static/navs/emergency.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        emergencyNews: function() {
            var promise = $http({ method: 'GET', url: '/api/index.php/emergency' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;

};