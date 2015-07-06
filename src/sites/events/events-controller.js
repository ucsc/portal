var events = angular.module('main.events', ['main']);

events.config(function($stateProvider) {
  $stateProvider

      .state('main.events', {
          url: '^/events',
          controller: 'EventsCtrl',
          templateUrl: 'events/events.tpl.html',
          data: {
              pageTitle: 'Events'
          },
          resolve: {
              eventsMenu: function (siteMenuService) {
                  return siteMenuService.eventsMenu();
              }
          }
      })

      .state("main.events.feed", {
          url: "/:url",
          controller: 'EventsFeedCtrl',
          templateUrl: 'events/events-feed.tpl.html',
          data: {
              pageTitle: 'Events Feed'
          }
      })
    
});

events.controller('EventsCtrl', function($scope, $state, eventsMenu) {
  $scope.eventsMenu = eventsMenu.data.menu;
  $scope.trackback="main.events";
});

events.controller('EventsFeedCtrl', function($scope, $state, $stateParams, eventsMenu, eventsFactory) {
  $scope.trackback="main.events.feed";
  $scope.feedtitle = eventsMenu.data[$stateParams.url][0].title;
  // $scope.feedtitle = "hi";
  // $scope.eventData = eventsMenu.data[$stateParams.url][0];
  eventsFactory.getEvents($stateParams.url).success(function(data){
        $scope.events=angular.fromJson(data.events);
        console.log(data);
    }).error(function(data){
        console.log('ERROR');
    });
  // FeedService.parseFeed(eventsFeedUrl).success(function(data, status, headers, config){
  //     $scope.articles=data.responseData.feed.entries;
  //     //$scope.resultscount=data.length;
  //     console.log(data);
  // }).error(function(data, status, headers, config){
  //     console.log('ERROR');
  //     //$scope.resultscount='0';
  // });
  
});

events.factory('eventsFactory', function($http) {
    var urlBase = '//events.ucsc.edu/feed';
    var eventsFactory = {};
    eventsFactory.getEvents = function (keyword) {
        return $http.jsonp(urlBase + '/' + keyword + '.json' + '?jsonp_prefix=JSON_CALLBACK');
        // return $http({
        //         method: "JSONP",
        //         //params: params,
        //         url: urlBase + '/' + keyword + '.json',
        //         headers: {
        //             "Accept": "application/json;charset=utf-8",
        //             "Accept-Charset":"charset=utf-8"
        //         },
        //         callback: 'JSON_CALLBACK',
        //         isArray: false
        //     });
    };
    return eventsFactory;
});

// directory.controller('DirectorySearchPersonCtrl', function($scope, $state, $stateParams, searchFactory) {
//     $scope.pagename = $stateParams.uid;
//     $scope.trackback="main.directory.search.person";
//     $scope.backlink="main.directory.search";

//     searchFactory.getPerson($stateParams.uid).success(function(data){
//         $scope.person=data;
//         console.log(data);
//     }).error(function(data){
//         console.log('ERROR');
//     });

// });