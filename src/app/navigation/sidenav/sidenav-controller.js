module.exports = function($scope, $location, navigationService) {
    $scope.navigationService = navigationService.getNav();
};