var gulp = require('gulp'),
  rename = require('gulp-rename'),
  traceur = require('gulp-traceur'),
  webserver = require('gulp-webserver'),
  concatCss = require('gulp-concat-css');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'css', 'img']);

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
      'node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/systemjs/dist/system-csp-production.src.js',
      'node_modules/systemjs/dist/system.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/angular2/bundles/angular2.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/angular2/bundles/router.js',
      'node_modules/angular2/bundles/http.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/es6-shim/es6-shim.map'
    ])
    .pipe(gulp.dest('build/lib'));
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'));
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(concatCss("css/styles.css"))
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('img', function () {
  return gulp.src('img/**/*')
    .pipe(gulp.dest('build/img'))
});
