module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'node_modules/angular/angular.min.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/angular-route/angular-route.min.js',
			'build-dev/js/app.js',
			'src/**/*.spec.js'
		],
		exclude: [
		],
		preprocessors: {
		},
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['PhantomJS', 'Chrome'],
		phantomjsLauncher: {
			exitOnResourceError: true
		},
		singleRun: true,
		concurrency: Infinity
	});
};
