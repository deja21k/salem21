var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-ruby-sass'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer'),
  // livereload = require('gulp-livereload'),
  combineMq = require('gulp-combine-mq');

// Scripts Task
gulp.task('scripts', function () {
  gulp.src('js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Styles Task
gulp.task('sass', function () {
  return sass('sass/**/*.sass', {
    compass: true, sourcemap: true
  })
    .pipe(autoprefixer({
      browsers: ['> 1%', 'IE 7'],
      cascade: false
    }))
    .pipe(combineMq({
      // beutify: false
    }))
    .pipe(plumber())
    .on('error', sass.logError)
    .pipe(gulp.dest('dist/css'))
});

// Watches JS
gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
