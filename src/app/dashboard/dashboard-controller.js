module.exports = function($scope, navigationService) {
    navigationService.getForecast().success(function(data){
        $scope.forecast=data;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
    });
};