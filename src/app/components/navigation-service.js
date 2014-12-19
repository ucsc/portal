module.exports = function navigationService($http) {

    var sdo = {
        getNav: function() {
            var promise = [
                //{id : 1, name : 'Dashboard', icon : 'icon-feather', url : 'dashboard'},
                {id : 1, name : 'Emergency', icon : 'icon-fire', url : 'emergency'}
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
        getWeather: function() {
            var promise = $http({ method: 'GET', url: 'api/static/weather.json' }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        },
        getEmergency: function() {
            var promise = $http({ method: 'GET', url: 'api/static/emergency.json', cache: false }).success(function(data, status, headers, config) {
                //var promise = $http({ method: 'GET', url: 'api/emergency/check', cache: false }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
        }
    }
    return sdo;

};