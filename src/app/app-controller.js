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
        var doesDrawer = angular.element( document.querySelector( "main[role='main']" ) );
        if(doesDrawer.hasClass('drawer')) {
            $scope.isOpen = false;
        }
    };
    $scope.opendrawer = function() {
        var doesDrawer = angular.element( document.querySelector( "main[role='main']" ) );
        if(!doesDrawer.hasClass('drawer')) {
            $scope.isOpen = true;
        }
    };
    $scope.topbar = function() {
        if($scope.isTop) {
            angular.element( document.querySelector( "button.right-nav" ) ).addClass('active');
            //angular.forEach(angular.element( document.querySelector( "article header button.right-nav" ) ), function(value, key){
            //    var a = angular.element(value);
            //    a.addClass('active');
            //});
        }
        else {
            angular.element( document.querySelector( "button.right-nav" ) ).removeClass('active');
            //angular.forEach(angular.element( document.querySelector( "article header button.right-nav" ) ), function(value, key){
            //    var a = angular.element(value);
            //    a.removeClass('active');
            //});
        }
        $scope.isTop = !$scope.isTop;
    };
    $scope.isTop = true;

    //var isState1 = angular.element( document.querySelector( "body" ) );
    //if(angular.element( document.querySelector( "body" ).hasClass('state-1'))) {
    //    $scope.isOpen = true;
    //}


};