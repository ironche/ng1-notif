var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var del = require('del');
var path = require('path');
var streamQueue = require('streamqueue');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
var src = pkg.directories.dev;
var dst = pkg.directories.distDev;

gulp.task('clean', function() {
	return del([
			pkg.directories.distDev,
			pkg.directories.distProd
		]).then(function(paths) {
			console.log('Deleted files:\n', paths.join('\n'));
		});
});

gulp.task('css', function() {
	return gulp.src([
			src + '/styles/**/*.less',
			src + '/app/**/*.less'
		])
		.pipe($.concat('app.less'))
		.pipe($.less())
		.pipe($.autoprefixer())
		.pipe(gulp.dest(dst + '/css'));
});

gulp.task('js', function() {
	var ng = ['component', 'controller', 'service', 'directive'].join('|');

	return streamQueue({ objectMode: true },
			gulp.src([
				src + '/app/app.js',
				src + '/app/routes.js'
			], {base: src}),
			gulp.src(src + '/app/**/*.module.js', {base: src}),
			gulp.src(src + '/app/**/*.+(' + ng + ').js', {base: src})
		)
		.pipe($.concat('app.js'))
		.pipe($.wrap({
			src: 'gulp.wrap.js'
		}))
		.pipe(gulp.dest(dst + '/js'));
});

gulp.task('vendor', function() {
	var vnd = pkg.directories.vendor;

	return gulp.src([
			vnd + '/angular/angular.min.js',
			vnd + '/angular-route/angular-route.min.js',
			vnd + '/normalize.css/normalize.css'
		], {base: vnd})
		.pipe(gulp.dest(dst + '/vendor'));
});

gulp.task('html:templates', function() {
	return gulp.src(src + '/app/**/*.html')
		.pipe(gulp.dest(dst + '/templates/'));
});

gulp.task('html:app', function() {
	return gulp.src(src + '/index.html')
		.pipe(gulp.dest(dst));
});

gulp.task('html', ['html:templates', 'html:app']);

gulp.task('build:dev', function(cb) {
	runSequence('clean', ['js', 'css', 'vendor', 'html'], cb);
});

gulp.task('build:prod-step-1', function() {
	return gulp.src(dst + '/index.html')
		.pipe($.replace(/"vendor\//g, '"../' + pkg.directories.vendor + '/'))
		.pipe($.useref())
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cleanCss()))
		.pipe(gulp.dest(pkg.directories.distProd));
});

gulp.task('build:prod-step-2', function() {
	return gulp.src(src + '/app/**/*.html')
		.pipe($.htmlMinifier({
			collapseBooleanAttributes: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(pkg.directories.distProd + '/templates/'));
});

gulp.task('build:prod', function(cb) {
	runSequence('build:dev', ['build:prod-step-1', 'build:prod-step-2'], cb);
});

gulp.task('serve:dev', ['build:dev'], function() {
	browserSync({
		notify: false,
		server: {
			baseDir: [dst]
		}
	});
	var reload = browserSync.reload;
	gulp.watch(src + '/app/**/*.html', ['html:templates', reload]);
	gulp.watch(src + '/index.html', ['html:app', reload]);
	gulp.watch(src + '/**/*.less', ['css', reload]);
	gulp.watch(src + '/**/*.js', ['js', reload]);
});
