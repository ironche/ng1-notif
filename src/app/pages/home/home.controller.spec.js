describe('home.controller', function() {

	var scope, createController;

	beforeEach(function() {
		module('app');

		inject(function($rootScope, $controller) {
			scope = $rootScope.$new();

			createController = function() {
				return $controller('HomeController', {
					'$scope': scope
				});
			};
		});
	});

	it('Initial scope matches expectations', function() {
		var controller = createController();

		expect(scope.title.length).toBe(0);
		expect(scope.text.length).toBe(0);
		expect(scope.type).toBe('info');
	});
});
