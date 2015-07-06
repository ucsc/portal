var test = angular.module('main.test', ['main']);

test.config(function($stateProvider) {
	$stateProvider
	    .state("main.test", {
	      url: "^/test",
	      templateUrl: 'test/test.tpl.html'
		  
	    })
		
});