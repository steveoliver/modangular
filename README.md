# Modangular
This repo is an AngularJS seed with a modular file structure.

The `client` directory is where the source files are. JS, Less, and HTML templates are built
and copied over to the `public` directory.

The `public` directory is what will be served. Static files like `index.html` and images belong in the `public` directory.

The gulp build process includes linting, code style checking, template compiling, angular annotation, source file concatenation, less compilation, css minification, js minification, and js sourcemaps.

The `gulp unit` and `gulp e2e` tasks run unit and end-to-end tests.

# Dependencies
Selenium Server, for end-to-end testing.
If you do not have Protractor installed globally or an existing Selenium Server running:
```
npm install -g protractor
webdriver-manager update --standalone
webdriver-manager start
```
NOTE: Run `webdriver-manager start` in a separate terminal from the gulp tasks.  Also, silence noisy Selenium Server output with this instead of the `webdriver-manager start` command:
```
nohup bash -c "webdriver-manager start 2>&1"
```

# Setup
```
git clone ...
cd modangular
npm install
bower install
```

# Build, Serve, & Watch
The default gulp action builds the app, then watches for changes. (it doesn't watch for vendor changes). BrowserSync serves and auto-reloads
the app in the browser while tests autorun and report in the console.
Linting and codestyle checks are done before each new build.
```
gulp
```

# Vendor Build
You can explicitly build vendor dependencies with the `build-vendor` task. (Do this before first `gulp`).
```
gulp build-vendor
```

# Build application javascript (with sourcemaps)
Explicitly build app javascript. Linting and codestyle checks are done before the build.
```
gulp build-js
```

# Build less/css
Explicitly build app css
```
gulp build-css
```

# Dev Build
Builds JS with sourcemaps, and CSS
```
gulp build
```

# Prod Build
Builds JS without sourcemaps, and CSS
```
gulp build-dist
```

# Watch
Runs a dev build when files are changed. (Does not serve app)
```
gulp watch
```

# Unit Testing
Runs one pass of unit tests.
```
gulp unit
```

# End-to-end (E2E) Testing
Runs one pass of end-to-end tests. NOTE: './node_modules/protractor/bin/webdriver-manager start' (or just `webdriver-manager` if protractor is installed globally) must be running.
```
gulp e2e
```

