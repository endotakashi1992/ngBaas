var gulp        = require('gulp');
var jade        = require('gulp-jade');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var styl = require('gulp-stylus');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var bower = require('main-bower-files');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:8000"
    });
});

gulp.task('dist',function(){
    gulp.src("**/*.coffee")
    .pipe(coffee())
    .pipe(gulp.dest('dist'))
})

gulp.task('bower', function(){
    gulp.src(bower())
    .pipe(gulpif(/[.]js$/, concat('lib.js')))
    .pipe(gulpif(/[.]css$/, concat('lib.css')))
    .pipe(gulp.dest("public/"));
});

gulp.task('jade', function () {
    return gulp.src('jade/**/*.jade')
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest('public/'))
});

gulp.task('coffee', function () {
    return gulp.src(['coffee/**/*.coffee'])
        .pipe(plumber())
        .pipe(gulpif(/[.]coffee$/, coffee()))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/'))
});

gulp.task('styl', function () {
    return gulp.src(['styl/**/*.styl'])
        .pipe(plumber())
        .pipe(styl())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/'))
});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('default', ['jade', 'coffee','bower','webserver'], function () {
    gulp.watch("jade/*.jade", ['jade']);
    gulp.watch("styl/*.styl", ['styl']);
    gulp.watch("coffee/*.coffee", ['coffee']);
    gulp.watch("lib/*", ['styl','coffee']);
    gulp.watch("bower_components/*", ['bower']);
});