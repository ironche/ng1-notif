angular.module('app').controller('HomeController', [
	'$scope',
	'$location',
	'notifications',
	function($scope, $location, notifications) {
		$scope.title = '';
		$scope.text = '';
		$scope.type = 'info';

		$scope.create = function() {
			notifications.add($scope.type, $scope.title, $scope.text);
			$scope.title = '';
			$scope.text = '';
		};
	}
]);
