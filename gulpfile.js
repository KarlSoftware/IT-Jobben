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
gulp.task('javascript', function() {
  return gulp.src(['public/js/*.js', 'public/js/controllers/*/*.js'])
    .pipe(concat('itjobben.js', {
    }))
    .pipe(jsmin())
    .pipe(gulp.dest('./dist/js'));
});
