module.exports = function($scope, newsMenu) {
    //newsMenu.success(function(data){
    //    $scope.news=data.responseData.feed.entries;
    //    //$scope.resultscount=data.length;
    //    console.log(data);
    //}).error(function(data){
    //    console.log('ERROR');
    //    //$scope.resultscount='0';
    //});
    $scope.news = newsMenu.data.responseData.feed.entries;
};