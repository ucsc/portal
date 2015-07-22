var map = angular.module('main.map', ['main','leaflet-directive']);

map.config(function($stateProvider) {
	$stateProvider

	    .state('main.map', {
	        url: '^/map',
	        controller: 'MapCtrl',
	        templateUrl: 'map/map.tpl.html',
	        data: {
	            pageTitle: 'Map'
	        }
      })
		
});

map.controller('MapCtrl', function($scope, $state, $http, leafletData) {
  	$scope.trackback="main.map";

  	$http.get("inc/sites/map/json/route-markers.json").success(function(data, status) {
	    $scope.routeMarkers = data;
	});

  	leafletData.getGeoJSON().then(function(lObjs){
        window.leafletDataGeoJSON = lObjs;
    });
	
	angular.extend($scope, {
	    ucsc: {
	    	lat: 36.990007877827864,
	        lng: -122.05896377563475,
	        zoom: 15
	    },
	    defaults: {
	        scrollWheelZoom: false
	    },
	    layers: {
            baselayers: {
                // osm: {
                //     name: 'UCSC',
                //     type: 'xyz',
                //     url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                //     layerOptions: {
                //         showOnSelector: false,
                //         subdomains: ['a', 'b', 'c'],
                //         attribution: '&copy; UCSC',
                //         continuousWorld: true
                //     }
                // },
                ucsc: {
                    name: 'Mapbox UCSC',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1IjoicGV0ZXJtOTUwMTgiLCJhIjoiTWpFVTFVNCJ9.02rGGMIWgLdCfbVinaSZeQ',
                        mapid: 'peterm95018.kfmd8j0i',
                        showOnSelector: false,
                        // subdomains: ['a', 'b', 'c'],
                        attribution: '&copy; UCSC',
                        continuousWorld: true

                    }
                }
            }
        },
	    geojson:{}
	});

	$scope.r4StateChanged = function (id) {
	   if(id){ //If it is checked
	   		// alert('checked');
			$http.get("inc/sites/map/json/west-night-core-route.json").success(function(data, status) {
			    angular.extend($scope.geojson, {
			        route4: {
			            data: data,
			            style: {
			                // fillColor: "green",
			                weight: 5,
			                opacity: .8,
			                color: 'green',
			                // dashArray: '3',
			                // fillOpacity: 0.7
			            }
			        }
			    });
			});
	   	}
	   	else {
	   		angular.extend($scope.geojson, {
		        route4: {
		            // data: data,
		        }
			});
	   	}
	};

	$scope.r3StateChanged = function (id) {
	   if(id){ //If it is checked
	   		// alert('checked');
			$http.get("inc/sites/map/json/east-night-core-route.json").success(function(data, status) {
			    angular.extend($scope.geojson, {
			        route3: {
			            data: data,
			            style: {
			                // fillColor: "green",
			                weight: 5,
			                opacity: .8,
			                color: 'blue',
			                // dashArray: '3',
			                // fillOpacity: 0.7
			            }
			        }
			    });
			});
	   	}
	   	else {
	   		angular.extend($scope.geojson, {
		        route3: {
		            // data: data,
		        }
			});
	   	}
	};

	
	$scope.r2StateChanged = function (id) {
	   if(id){ //If it is checked
	   		// alert('checked');
			$http.get("inc/sites/map/json/upper-campus-route.json").success(function(data, status) {
			    angular.extend($scope.geojson, {
			        route2: {
			            data: data,
			            style: {
			                // fillColor: "green",
			                weight: 5,
			                opacity: .8,
			                color: 'red',
			                // dashArray: '3',
			                // fillOpacity: 0.7
			            }
			        }
			    });
			});
	   	}
	   	else {
	   		angular.extend($scope.geojson, {
		        route2: {
		            // data: data,
		        }
			});
	   	}
	};


	$scope.r1StateChanged = function (id) {
	   if(id){ //If it is checked
	   		// get route polyline data
			$http.get("inc/sites/map/json/loop-route.json").success(function(data, status) {
			    angular.extend($scope.geojson, {
			        route1: {
			            data: data,
			            style: {
			                // fillColor: "green",
			                weight: 5,
			                opacity: .8,
			                color: 'yellow',
			                // message: "<h3>Route from London to Rome</h3><p>Distance: 1862km</p>",
			                // dashArray: '3',
			                // fillOpacity: 0.7
			            }
			        }
			    });
			});

			//set markers for route
			angular.extend($scope, {
                markers: {
                	route1: {
	                    1: {
	                        lat: 36.97753818,
	                        lng: -122.0534438,
	                        compileMessage: false,
	                        message: "I'm a static marker"
	                    },
	                    2: {
	                        lat: 36.97731841,
	                        lng: -122.0545006,
	                        focus: true,
	                        message: "<div ng-include src=\"'views/template.html'\"></div>",
	                        draggable: true
	                    },
	                    3: {
	                        lat: 36.994669573079065,
	                        lng: -122.05557346343994,
	                        message: "<p>Hi</p>",
	                        compileMessage: true
	                    }
                	}
                }
            });
	   	}
	   	else {
	   		angular.extend($scope.geojson, {
		        route1: {
		            // data: data,
		        }
			});
			angular.extend($scope, {
                markers: {
                	route1: {}
                }
            });
	   	}
	};



	

});