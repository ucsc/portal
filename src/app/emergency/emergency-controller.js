module.exports = function($scope, emergencyMenu) {
    $scope.emergencyMenu = emergencyMenu.data.menu;
};

//module.exports = function($scope, siteMenuService) {
//    siteMenuService.emergencyMenu().success(function(data){
//        $scope.testing=data.menu;
//        //$scope.resultscount=data.length;
//        console.log(data);
//    }).error(function(data){
//        console.log('ERROR');
//        //$scope.resultscount='0';
//    });
//};