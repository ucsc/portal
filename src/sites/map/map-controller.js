var map = angular.module('main.map', ['main','leaflet-directive']);

map.config(function($stateProvider) {
	$stateProvider

	    .state('main.map', {
	        url: '^/map',
	        controller: 'MapCtrl',
	        templateUrl: 'map/map.tpl.html',
	        data: {
	            pageTitle: 'Map'
	        },
	        resolve: {
	            mapRestrooms: function (siteMenuService) {
	                return siteMenuService.mapRestrooms();
	            },
	            mapTransit: function (siteMenuService) {
	                return siteMenuService.mapTransit();
	            },
	            mapParking: function (siteMenuService) {
	                return siteMenuService.mapParking();
	            }
        	}
      })
		
});

map.controller('MapCtrl', function($scope, $state, $http, mapRestrooms, mapTransit, mapParking, leafletData) {
  	$scope.trackback="main.map";

 //  	$http.get("api/static/maps/parking.json").success(function(data, status) {
	//     $scope.definedParking = data;
	// });

	// $http.get("api/static/maps/restrooms.json").success(function(data, status) {
	//     $scope.definedRestrooms = data;
	// });

	// $scope.definedRestrooms = [];

	// $http.get('api/static/maps/restrooms.json').success(function(result) {
	// 	$scope.definedRestrooms = result;
 //    });

	// $scope.test2 = $scope.definedRestrooms;

	// httpq.get('api/static/maps/restrooms.json')
	//   .then(function(data) {
	//     $scope.definedRestrooms = data;
	//   })
	//   .catch(function(data, status) {
	//     console.error('Restroom error', response.status, response.data);
	//   })
	//   .finally(function() {
	//     console.log("finally finished restrooms");
	// });

	  // $scope.definedRestrooms = mapRestrooms.data.restrooms.overlay;

	// $http.get("api/static/maps/transit.json").success(function(data, status) {
	//     $scope.definedTransit = data;
	// });

// 	$scope.definedRestrooms = {
//   "restrooms": {
//     "markers": {
//       "rr0": {
//         "lat": 36.9833319,
//         "layer": "restrooms",
//         "lng": -122.0550343,
//         "message": "Agroecology Lab all-gender restroom"
//       }
//     },
//     "overlay": {
//       "layerParams": {
//         "showOnSelector": false
//       },
//       "name": "Restrooms",
//       "type": "group",
//       "visible": false
//     }
//   }
// };

	// $scope.definedOverlays = {
 //                route1: {
 //                    overlay: {
 //                        name: 'Route1',
 //                        type: 'group',
 //                        visible: false,
 //                        layerParams: {
 //                            showOnSelector: false
 //                        }
 //                    },
 //                    markers: {
 //                        a1: {
 //                            layer: 'route1',
 //                            lat: 36.97753818,
	// 		                lng: -122.0534438,
	// 		                message: "I'm a stop"
 //                        },
 //                        a2: {
 //                            layer: 'route1',
 //                            lat: 36.87753818,
	// 		                lng: -122.0534438,
	// 		                message: "I'm a stop"
 //                        }
 //                    }
 //                },
 //                route2: {
 //                    overlay: {
 //                        name: 'Route2',
 //                        type: 'group',
 //                        visible: false,
 //                        layerParams: {
 //                            showOnSelector: false
 //                        }
 //                    },
 //                    markers: {
 //                        b1: {
 //                            layer: 'route2',
 //                            lat: 36.96753818,
	// 		                lng: -122.0534438,
 //                            message: "I'm a bike"
 //                        },
 //                        b2: {
 //                            layer: 'route2',
 //                            lat: 36.95753818,
	// 		                lng: -122.0534438,
 //                            message: "I'm a bike"
 //                        }
 //                    }
 //                },
 //                restrooms: {
 //                    overlay: {
 //                        name: 'Restrooms',
 //                        type: 'group',
 //                        visible: false,
 //                        layerParams: {
 //                            showOnSelector: false
 //                        }
 //                    },
 //                    markers: {
 //                        rr1: {
 //                            layer: 'restrooms',
 //                            lat: 36.96753818,
	// 		                lng: -122.0534438,
 //                            message: "I'm a bike"
 //                        },
 //                        rr2: {
 //                            layer: 'restrooms',
 //                            lat: 36.95753818,
	// 		                lng: -122.0534438,
 //                            message: "I'm a bike"
 //                        }
 //                    }
 //                },
 //                parking: {
 //                    overlay: {
 //                        name: 'Parking',
 //                        type: 'group',
 //                        visible: false,
 //                        layerParams: {
 //                            showOnSelector: false
 //                        }
 //                    },
 //                    markers: {
 //                        pl1: {
 //                            layer: 'parking',
 //                            lat: 36.96753818,
	// 		                lng: -122.0534438,
 //                            message: "I'm a bike"
 //                        },
 //                        pl2: {
 //                            layer: 'parking',
 //                            lat: 36.95753818,
	// 		                lng: -122.0534438,
 //                            message: "I'm a bike"
 //                        }
 //                    }
 //                },
 //            };


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
            },
            overlays: {
            	// transit: $scope.definedTransit.transit.overlay,
                // restrooms: mapRestrooms.restrooms.overlay,
                // parking: $scope.definedParking.parking.overlay,

	            transit: mapTransit.data.transit.overlay,
	            restrooms: mapRestrooms.data.restrooms.overlay,
	            parking: mapParking.data.parking.overlay
            }
        },
        markers: {
            // transit: $scope.definedTransit.transit.markers,
            // restrooms: mapRestrooms.restrooms.markers,
            // parking: $scope.definedParking.parking.markers,

            transit: mapTransit.data.transit.markers,
            restrooms: mapRestrooms.data.restrooms.markers,
            parking: mapParking.data.parking.markers


        },
        defaultIcon: {
        	type: 'extraMarker',
                    icon: 'fa-star',
                    markerColor: '#f00',
                    prefix: 'fa',
                    shape: 'square'
        },
        extraMarkerIcon: {
            type: 'extraMarker',
            icon: 'fa-star',
            markerColor: '#f00',
            prefix: 'fa',
            shape: 'circle'
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
	   	}
	   	else {
	   		angular.extend($scope.geojson, {
		        route1: {
		            // data: data,
		        }
			});
	   	}
	};


	$scope.toggleLayer = function(type) {
        $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
    };

	

});