"use strict";

var gulp  = require('gulp');
var babel = require('gulp-babel');
var mocha = require('mocha');
var KarmaServer = require('karma').Server;

gulp.task('default',function() {
	return gulp.src("src/*.js")
		.pipe(babel())
		.pipe(gulp.dest("dist"));
});

gulp.task('test',function() {
	return new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}).start();
});
