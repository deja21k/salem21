var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-ruby-sass'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer'),
  // livereload = require('gulp-livereload'),
  combineMq = require('gulp-combine-mq')
  browserSync = require('browser-sync').create();

// Scripts Task
gulp.task('scripts', function () {
  gulp.src('js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Styles Task
gulp.task('sass', function () {
  return sass('sass/**/*.scss', {
    compass: true,
    sourcemap: true
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
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
});

// Watches JS
gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch("/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['scripts', 'sass', 'serve', 'watch']);
