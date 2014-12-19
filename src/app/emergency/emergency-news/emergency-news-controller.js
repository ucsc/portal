module.exports = function($scope, siteMenuService) {
    siteMenuService.emergencyNews().success(function(data){
        $scope.testing=data;
        //$scope.resultscount=data.length;
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
        //$scope.resultscount='0';
    });
};