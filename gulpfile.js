var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin'),
    htmlmin = require('gulp-htmlmin'),
    removeHtmlComments = require('gulp-remove-html-comments'),
    plumber = require('gulp-plumber'),
    image = require('gulp-image');

gulp.task('default', function() {
  console.log('Gulp working!');

});


/*
* Concat and uglify .js files
*/
gulp.task('js-dist', function() {
  return gulp.src(['public/js/app.js', 'public/js/controllers/*/*.js'])
    .pipe(plumber())
    .pipe(concat('itjobben.js'))
    .pipe(jsmin())
    .pipe(gulp.dest('./dist/js'));
});

/*
* Concat and uglify .js files
* Outputs in public directory for use while development
*/
gulp.task('js-dev', function() {
  return gulp.src(['public/js/app.js', 'public/js/controllers/*/*.js'])
    .pipe(plumber())
    .pipe(concat('itjobben.js'))
    .pipe(gulp.dest('./public/js'));
});

/*
* Minify and remove comments from html index page
*/
gulp.task('minify-html-index', function() {
  return gulp.src('public/index.html')
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

/*
* Minify and remove comments from html template root page
*/
gulp.task('minify-html-template-root', function() {
  return gulp.src('public/templates/*.html')
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/templates/'))
});

/*
* Minify and remove comments from html template root page
*/
gulp.task('minify-html-templates-folders', function() {
  return gulp.src('public/templates/*/*.html')
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/templates/'))
});

/*
* Optimize images
*/
gulp.task('images-randomAds', function() {
  return gulp.src('public/img/randomAds/*.jpg')
    .pipe(image())
    .pipe(gulp.dest('./dist/img/randomAds/'))
})

/*
* Gulp watch
*/
gulp.task('watch', function() {
  // watch js
  gulp.watch(['public/js/app.js', 'public/js/controllers/*/*.js'], ['js-dist', 'js-dev']);
  // watch html
  gulp.watch('public/index.html', ['minify-html-index']);
  gulp.watch('public/templates/*', ['minify-html-template-root']);
  gulp.watch('public/templates/*/*.html', ['minify-html-templates-folders']);
  // watch randomAds images
  gulp.watch('public/img/randomAds/*', ['images-randomAds']);
})

/*
* Gulp default
* this will do everything
*/
gulp.task('default', ['js-dev', 'js-dist', 'watch'])
