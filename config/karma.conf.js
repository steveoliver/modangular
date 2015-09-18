module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns
    basePath: '.',

    // frameworks to use
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    // @todo Get these values from require('../config/build') ?
    files: [
      '../public/vendor/lodash/lodash.js',
      '../public/vendor/angular/angular.js',
      '../public/vendor/angular-ui-router/release/angular-ui-router.js',
      '../public/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      '../public/vendor/angular-mocks/angular-mocks.js',
      '../public/js/templates.js',
      '../public/js/app.js',
      '../client/modules/**/*spec.js',
      './mock/*.js'
    ],

    // test result reporter
    reporters: ['progress', 'coverage'],

    preprocessors: {
      '../client/modules/**/*.js': [ 'coverage' ]
    },

    coverageReporter: {
      type: 'html',
      dir: '../test-coverage/'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    singleRun: false
  });
};
