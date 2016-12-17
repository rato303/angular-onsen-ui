const gulp = require('gulp');
const webServer = require('gulp-webserver');
const gnf = require('gulp-npm-files');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

const PATH = {
  DIRECTORY: {
    SRC: 'src',
    ASSETS: 'assets',
    PUBLIC: 'public'
  }
}

gulp.task('webserver', () => {

  gulp.src(`${PATH.DIRECTORY.PUBLIC}`)
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
      'copyNpmDependenciesOnly',
      'copyAssetsFiles'
    ]
  );
});

gulp.task('clean', (callback) => {
  console.log('clean');
  return rimraf(`./${PATH.DIRECTORY.PUBLIC}`, callback);
});

gulp.task('copyIndexFile', () => {
  console.log('copyIndexHtml');
  return gulp
    .src([
      'index.html',
      'index.js'
    ])
    .pipe(
      gulp.dest(`./${PATH.DIRECTORY.PUBLIC}`)
    );
});

gulp.task('copyProjectSource', () => {
  console.log('copyProjectSource');
  return gulp
    .src([
      `./${PATH.DIRECTORY.SRC}/**/*`
    ], {
      base: `./${PATH.DIRECTORY.SRC }`
    })
    .pipe(
      gulp.dest(`./${PATH.DIRECTORY.PUBLIC}`)
    );
});


gulp.task('copyAssetsFiles', () => {
  console.log('copyAssetsFiles');
  return gulp
    .src([
      `./${PATH.DIRECTORY.ASSETS}/**/*`
    ], {
      base: `./${PATH.DIRECTORY.ASSETS}`
    })
    .pipe(
      gulp.dest(`${PATH.DIRECTORY.PUBLIC}/${PATH.DIRECTORY.ASSETS}`)
    );
});

gulp.task('copyNpmDependenciesOnly', () => {
  console.log('copyNpmDependenciesOnly');
  return gulp
    .src(gnf(), {
      base: './'
    })
    .pipe(
      gulp.dest(`${PATH.DIRECTORY.PUBLIC}`)
    );
});
