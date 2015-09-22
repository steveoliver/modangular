/**
 * Define all modules to be loaded for the app.
 *
 * Make sure _vendor_ source files are added to vendorJSFiles in gulpfile.js
 */
angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'app.example',
  'app.main',     // template for this is the main controller is in public/index.html
  'app.templates', // dynamically created via gulp-ng-templates
  'app.util'
]);
