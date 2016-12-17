const gulp = require('gulp');
const webServer = require('gulp-webserver');
const gnf = require('gulp-npm-files');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

const PUBLIC_DIRECTORY_PATH = './public';

gulp.task('webserver', () => {

  gulp.src(PUBLIC_DIRECTORY_PATH)
    .pipe(webServer({
      host: '0.0.0.0',
      port: 8080,
      path: '/',
      fallback: 'index.html'
    }));

});

gulp.task('build', () => {
  console.log('build');
  return runSequence(
    'clean',
    [
      'copyIndexFile',
      'copyProjectSource',
      'copyNpmDependenciesOnly'
    ]
  );
});

gulp.task('clean', (callback) => {
  console.log('clean');
  return rimraf(PUBLIC_DIRECTORY_PATH, callback);
});

gulp.task('copyIndexFile', () => {
  console.log('copyIndexHtml');
  return gulp
    .src([
      'index.html',
      'index.js'
    ])
    .pipe(
      gulp.dest(PUBLIC_DIRECTORY_PATH)
    );
});

gulp.task('copyProjectSource', () => {
  console.log('copyProjectSource');
  return gulp
    .src([
      'src/**/*'
    ], {
      base: 'src'
    })
    .pipe(
      gulp.dest(PUBLIC_DIRECTORY_PATH)
    );
});

gulp.task('copyNpmDependenciesOnly', () => {
  console.log('copyNpmDependenciesOnly');
  return gulp
    .src(gnf(), {
      base: './'
    })
    .pipe(
      gulp.dest(PUBLIC_DIRECTORY_PATH)
    );
});
