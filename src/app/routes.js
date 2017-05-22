angular.module('app').config([
	'$locationProvider',
	'$routeProvider',
	function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');

		$routeProvider.when('/', {
			templateUrl: 'templates/pages/home/home.html',
			controller: 'HomeController'
		})
	}
]);
