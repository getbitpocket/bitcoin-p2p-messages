"use strict";

var gulp  = require('gulp');
var esl   = require('gulp-eslint');
var babel = require('gulp-babel');
var mocha = require('mocha');
var KarmaServer = require('karma').Server;

gulp.task('lint', function () {
	return gulp.src(['src/**/*.js','test/**/*.js','!node_modules/**'])
		.pipe(esl())
		.pipe(esl.format())
		.pipe(esl.failAfterError());
});

gulp.task('default',['lint'],function() {
	return gulp.src("src/*.js")
		.pipe(babel())
		.pipe(gulp.dest("dist"));
});

gulp.task('test',['lint'],function() {
	return new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}).start();
});
