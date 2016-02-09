"use strict";

var gulp  = require('gulp');
var esl   = require('gulp-eslint');
var git   = require('gulp-git');
var tag   = require('gulp-tag-version');
var babel = require('gulp-babel');
var bump  = require('gulp-bump');
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

gulp.task('version-bump',['lint'],function() {
	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'))
        .pipe(git.commit('bumps package version: ' + require('./package.json').version))
        .pipe(tag());
});
