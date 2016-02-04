module.exports = function(config) {
    config.set({

        browsers: ['PhantomJS'] ,

        basePath: '',

        files: [
            "src/**/*.js",
            "test/**/*.js"
        ],

        preprocessors: {
            "src/**/*.js" : ["browserify"],
            "test/**/*.js": ["browserify"]
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        reporters: ['mocha'] ,

        frameworks: ['browserify','mocha','chai'] ,

    });
};
