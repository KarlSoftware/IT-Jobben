var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin');

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
* Gulp watch
*/
gulp.task('watch', function() {
  gulp.watch(['public/js/app.js', 'public/js/controllers/*/*.js'], ['js-dist', 'js-dev']);
})

/*
* Gulp default
* this will do everything
*/
gulp.task('default', ['js-dev', 'js-dist', 'watch'])
