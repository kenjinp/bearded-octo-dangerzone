//include gulp
var gulp = require('gulp');

//include plug-ins
var jshint = require('gulp-jshint'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

//JS hint task
gulp.task('jshint', function () {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

//minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.html',
      htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

//JS concat, strip debugging then minify
gulp.task('scripts', function() {
  gulp.src(['./src/scripts/lib/*.js','./src/scripts/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'));
});

//CSS sass, concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/styles/normalize.css','./src/styles/*scss'])
    .pipe(sass())
    .pipe(concat('syles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

//default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
  //watch for HTMl changes
  gulp.watch('./src/*.html', ['htmlpage']);
  //watch for JS changes
  gulp.watch('./src/scripts/*.js' ['jshint', 'scripts']);
  //watch for CSS changes
  gulp.watch('./src/styles/*.scss', ['styles']);
});
