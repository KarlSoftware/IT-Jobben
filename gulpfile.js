var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin'),
    htmlmin = require('gulp-htmlmin');;

gulp.task('default', function() {
  console.log('Gulp working!');

});


/*
* Concat and uglify .js files
*/
gulp.task('js-dist', function() {
  return gulp.src(['public/js/app.js', 'public/js/controllers/*/*.js'])
    .pipe(concat('itjobben.js', {
    }))
    .pipe(jsmin())
    .pipe(gulp.dest('./dist/js'));
});

/*
* Concat and uglify .js files
* Outputs in public directory for use while development
*/
gulp.task('js-dev', function() {
  return gulp.src(['public/js/app.js', 'public/js/controllers/*/*.js'])
    .pipe(concat('itjobben.js', {
    }))
    .pipe(gulp.dest('./public/js'));
});

/*
* Minify html index page
*/
gulp.task('minify-html-index', function() {
  return gulp.src('public/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

/*
* Minify html template root page
*/
gulp.task('minify-html-template-root', function() {
  return gulp.src('public/templates/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/templates/'))
});

/*
* Minify html template root page
*/
gulp.task('minify-html-templates-folders', function() {
  return gulp.src('public/templates/*/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/templates/'))
});

/*
* Gulp watch
*/
gulp.task('watch', function() {
  gulp.watch(['public/js/app.js', 'public/js/controllers/*/*.js'], ['js-dist', 'js-dev']);
  gulp.watch(['public/index.html', 'public/templates/*', 'public/templates/*/*.html'], ['minify-html-index', 'minify-html-template-root', 'minify-html-templates-folders'])
})

/*
* Gulp default
* this will do everything
*/
gulp.task('default', ['js-dev', 'js-dist', 'watch'])
