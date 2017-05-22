describe('countdown.directive', function() {

	var scope, compile, directive;

	beforeEach(function() {
		module('timer');

		inject(function($rootScope, $compile){
			scope = $rootScope.$new();
			compile = $compile;
		});

		directive = (function() {
			var element = angular.element('<countdown seconds="10" finish=""></countdown>');
			var compiledElement = compile(element)(scope);
			scope.$digest();
			return compiledElement[0];
		})();
	});

	it('Renders inner text', function() {
		expect(directive.innerHTML.length).toBeGreaterThan(0);
	});

	it('Renders text in correct format', function() {
		expect(directive.innerHTML).toMatch(/^:\s\d+s$/);
	});

	it('Starts counter with value from attribute', function() {
		expect(directive.innerHTML.indexOf(10)).toBeGreaterThan(-1);
	});
});
