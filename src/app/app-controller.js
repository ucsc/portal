module.exports = function($scope, $location) {

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | UCSC Mobile';
        }
    });

    $scope.navVisible = false;

    $scope.toggleNav = function() {

        $scope.navVisible = !$scope.navVisible;

    };

    $scope.drawer = function() {
        $scope.isOpen = !$scope.isOpen;
    };
    $scope.isOpen = false;
    $scope.closedrawer = function() {
        //if($scope.isOpen==true) {
        //    $scope.drawer();
        //}
    };


};