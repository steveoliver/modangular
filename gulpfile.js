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
var serve = require('gulp-serve');

var vendorJSFiles = [
  'public/vendor/lodash/lodash.js',
  'public/vendor/angular/angular.js',
  'public/vendor/angular-ui-router/release/angular-ui-router.js',
  'public/vendor/angular-bootstrap/ui-bootstrap-tpls.js'
];

var appJSFiles = [
  'client/modules/**/*.js',
  'client/index.js'
];

var allAppJSFiles = appJSFiles.concat(['public/js/templates.js']);

var templateFiles = ['client/modules/**/views/*.html'];

var cssfiles = [
  'client/less/styles.less'
];

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
  return gulp.src(cssfiles)
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('build-css', ['styles'], function() {
  return gulp.src('public/css/styles.css')
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('public/css'));
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
  gulp.watch(cssfiles, ['build-css']);
});

gulp.task('serve', serve('public'));

// Dev build with source maps
gulp.task('build', ['build-js', 'build-css'], function(){});

// Prod build w/o source maps
gulp.task('build-dist', ['build-js-dist', 'build-css'], function(){});


gulp.task('default', ['build', 'serve', 'watch']);