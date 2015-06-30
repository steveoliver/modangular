# Modangular
This repo is an AngularJS seed with a modular file structure.

The `client` directory is where the source files are. JS, Less, and HTML templates are built
and copied over to the `public` directory.

The `public` directory is what will be served. Static files like `index.html` and images belong in the `public` directory.

The gulp build process includes linting, code style checking, template compiling, angular annotation, source file concatenation,
less compilation, css minification, js minification, and js sourcemaps.


# Setup
```
git clone ...
cd modangular
npm install
bower install
```

# Build, Serve, & Watch
The default gulp action builds the app, then watches for changes. (it doesn't watch for vendor changes)
Linting and codestyle checks are done before each new build.
```
gulp
```

# Vendor Build
You can explicitly build vendor dependencies with the `build-vendor` task.
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



