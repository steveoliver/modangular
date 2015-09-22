// Gulp Dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('lodash');

// Build Dependencies
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var htmlmin = require('gulp-htmlmin');
var ngTemplates = require('gulp-ng-templates');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var karma = require('karma').server;
var browserSync = require('browser-sync').create();
var protractor = require('gulp-protractor').protractor;

// Share our configuration between JS files.
var config = require('./build-config');

// Prepare variables for all the files we work on.
var vendorJSFiles = config.vendor_files.js;
var templateFiles = config.app_files.html;
var lessFiles = config.app_files.less;
var appJSFiles = config.app_files.js;
var allAppJSFiles = appJSFiles.concat(['public/js/templates.js']);
var jsWatchFiles = appJSFiles.concat(templateFiles);

gulp.task('lint', function() {
  return gulp.src(appJSFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('codestyle', function () {
  return gulp.src(appJSFiles)
    .pipe(jscs({preset: 'google'}));
});

gulp.task('styles', function() {
  return gulp.src(lessFiles)
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('build-css', ['styles'], function() {
  return gulp.src('public/css/styles.css')
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('templates', function () {
  return gulp.src(templateFiles)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngTemplates({
      filename: 'templates.js',
      module: 'app.templates'
    }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build-vendor', function() {
  return gulp.src(vendorJSFiles)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('build-js', ['lint', 'codestyle', 'templates'], function() {
  return gulp.src(allAppJSFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('public/js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

gulp.task('build-js-dist', ['lint', 'codestyle', 'templates'], function() {
  return gulp.src(allAppJSFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gutil.log(jsWatchFiles);
  gulp.watch(jsWatchFiles, ['build-js']);
  gulp.watch(lessFiles, ['build-css']);
});

// Dev build with source maps
gulp.task('build', ['build-js', 'build-css'], function(){});

// Prod build w/o source maps
gulp.task('build-dist', ['build-js-dist', 'build-css'], function(){});

// App server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './public/'
    }
  });
  gulp.watch(['public/*.html', 'public/js/*.js']).on('change', browserSync.reload);
});

// Unit testing
gulp.task('unit', function(done) {
  karma.start({
    configFile: __dirname + '/client/tests/karma.conf.js',
    singleRun: true
  }, done);
});

// Continuous unit testing
gulp.task('autounit', function(done) {
  karma.start({
    configFile: __dirname + '/client/tests/karma.conf.js',
  }, done);
});

// End-to-end testing (after `webdriver-manager start`)
gulp.task('e2e', ['serve'], function() {
  var args = ['--baseUrl', 'http://localhost:3000'];
  gulp.src(['./client/tests/e2e/*.js'])
    .pipe(protractor({
      configFile: './client/tests/protractor.conf.js',
      args: args
    }))
    .on('end', function() {
      process.exit();
    })
    .on('error', function(e) {
      throw e;
    });
});

gulp.task('default', ['build', 'serve', 'watch', 'autounit']);
gulp.task('test', ['serve', 'unit', 'e2e']);
