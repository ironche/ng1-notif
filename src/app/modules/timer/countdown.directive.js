angular.module('timer').directive('countdown', [
	'$interval',
	function($interval) {

		return {
			restrict: 'E',
			scope: {
				seconds: '@',
				finish: '&'
			},
			link: function(scope, element) {
				var counter = scope.seconds;

				updateCountdown();

				var timeout = $interval(function() {
					updateCountdown();
				}, 1000);

				element.on('$destroy', function() {
					$interval.cancel(timeout);
				});

				function updateCountdown() {
					element.text(': ' + counter + 's');

					if (!counter) {
						element.triggerHandler('$destroy');
						scope.finish();
					}

					counter--;
				}
			}
		};
	}
]);
