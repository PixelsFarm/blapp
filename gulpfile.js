var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss')
var cleanCSS = require('gulp-clean-css')
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'Icons';

gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'));
})

gulp.task('autoprefixer', function() { // postcss auprefix & minify css
  gulp.src('css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
})

gulp.task('iconfont', function(){
  gulp.src(['./icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: './scss/custom/basic/_icons-template.scss',
      targetPath: '../scss/custom/basic/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName
     }))
    .pipe(gulp.dest('./fonts/'));
})

gulp.task('browser-sync', function() {
    browserSync.init(['*.html','css/*.css', 'scss/**/*.scss', 'js/*.js', 'images/*.png'], {
    	open: false,
        server: {
            baseDir: "./"
        }
    });
})

gulp.task('default', ['sass', 'autoprefixer', 'browser-sync'], function () {
    gulp.watch("scss/**/*.scss", ['sass']);
});