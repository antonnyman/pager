var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssnano =  require('gulp-cssnano');
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var port = 35729;

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({ port: port }));
  app.use(express.static(__dirname + '/dist'));
  app.listen(4000, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(port, function() {
    console.log('Tiny-LR listening on %s', port);
  });
});

function reloadPage(event) {
  var filename = require('path').relative(__dirname + '/dist', event.path);
  tinylr.changed({
    body: {
      files: [filename]
    }
  });
}

gulp.task('styles', function() {
  return gulp.src('sass/*.scss')
  .pipe(rename({ suffix: '.min' }))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src(['bower_components/page/page.js', 'js/*.js'])
  .pipe(concat('scripts.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  return gulp.src('html/*.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('json', function() {
  return gulp.src('json/*.json')
  .pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
  gulp.watch('sass/*.sass', ['styles']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('html/*.html', ['html']);
  gulp.watch('json/*.json', ['json']);

  gulp.watch('dist/*.css', reloadPage);
  gulp.watch('dist/*.js', reloadPage);
  gulp.watch('dist/*.html', reloadPage);
  gulp.watch('dist/*.json', reloadPage);

});

gulp.task('default', ['express',
                     'livereload',
                      'styles',
                      'js',
                      'html',
                      'json',
                      'watch'], function() {

});
