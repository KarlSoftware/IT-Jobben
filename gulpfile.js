/*********************************************************************************
* REQUIRE
/********************************************************************************/
var gulp = require('gulp'),
    concat = require('gulp-concat'),                                  // Concat files
    jsmin = require('gulp-jsmin'),                                    // Minify JS files
    htmlmin = require('gulp-htmlmin'),                                // Minify html files
    removeHtmlComments = require('gulp-remove-html-comments'),        // Remove html comments
    plumber = require('gulp-plumber'),                                // Prevent pipe breaking caused by errors from other plugins
    image = require('gulp-image'),                                    // Optimize images
    usemin = require('gulp-usemin'),                                  // Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)
    cleanCSS = require('gulp-clean-css'),                             // Minify css
    uglify = require('gulp-uglify'),                                  // Uglify Code
    rev = require('gulp-rev'),                                        // static asset revisioning by appending content hash to filenames
    autoprefixer = require('gulp-autoprefixer'),                      // add browser prefixed to css code (ex -moz )
    git = require('gulp-git'),                                        // Run git commands
    stripDebug = require('gulp-strip-debug'),                         // Remove debugging (console.log) from js Code
    useref = require('gulp-useref'),                                  // Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views)
    gulpif = require('gulp-if'),                                      // If statements
    sass = require('gulp-sass');                                      // Handle SASS

// variable for output directory
var outputDir = './dist/';


/*********************************************************************************
* JAVASCRIPT
/********************************************************************************/

/*
* Concat and uglify .js files to output directory
*/
gulp.task('js-dist', function() {
  return gulp.src(['app/js/app.js', 'app/js/controllers/*/*.js'])
    .pipe(plumber())
    .pipe(concat('itjobben.js'))
    .pipe(jsmin())
    .pipe(stripDebug())
    .pipe(gulp.dest(outputDir + 'js'));
});

/*
* Concat and uglify .js files
* Outputs in app directory for use while development
*/
gulp.task('js-dev', function() {
  return gulp.src(['app/js/app.js', 'app/js/controllers/*/*.js'])
    .pipe(plumber())
    .pipe(concat('itjobben.js'))
    .pipe(gulp.dest('./app/js'));
});

/*********************************************************************************
* HTML
/********************************************************************************/

/*
* Minify and remove comments from html index page
* Outputs to dist directory
*/
gulp.task('minify-html-index', function() {
  return gulp.src('app/index.html')
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(outputDir))
});

/*
* Minify and remove comments from html template root page
* Outputs to dist directory
*/
gulp.task('minify-html-template-root', function() {
  return gulp.src('app/templates/*.html')
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(outputDir + 'templates'))
});

/*
* Minify and remove comments from html template root page
* Outputs to dist directory
*/
gulp.task('minify-html-templates-folders', function() {
  return gulp.src('app/templates/*/*.html')
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(outputDir + 'templates'))
});

/*********************************************************************************
* IMAGES
/********************************************************************************/

/*
* Optimize images
* Outputs to dist directory
*/
gulp.task('images-randomAds', function() {
  return gulp.src('app/img/randomAds/*.jpg')
    .pipe(image())
    .pipe(gulp.dest(outputDir + 'img/randomAds/'))
});

/*********************************************************************************
* STYLES
/********************************************************************************/

/*
* Sass task
* Outputs to app directory
*/
gulp.task('sass', function() {
  return gulp.src(['app/css/scss/*.scss', 'app/css/scss/partials/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
});

/*
* compress regular stylesheet
* Outputs to dist directory
*/
gulp.task('compress-css', function() {
  return gulp.src('app/css/style.css')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest(outputDir + 'css'))
});


/*********************************************************************************
* USEREF
/********************************************************************************/
gulp.task('useref', function() {
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', concat('js/assets.js')))
    .pipe(gulpif('*.css', sass()))
    .pipe(gulp.dest(outputDir));
});





/*********************************************************************************
* DEPLOY TO VPS-SERVER USING GIT
/********************************************************************************/

//1. Checkout digitalocean
gulp.task('checkout', function(){
  return git.checkout('digitalocean', function (err) {
    if (err) throw err;
  });
});

//2. Update branch from origin master
gulp.task('update', function() {
  return git.pull('.', 'master', {args: '--rebase'}, function (err) {
     if (err) throw err;
   });
})

//3. Build dist folder according to update-branch changes
gulp.task('build', [
  'js-dist',
  'minify-html-template-root',
  'minify-html-templates-folders',
  'images-randomAds',
  'compress-css',
  'useref'
]);

//4. Commit changes
gulp.task('commit', function(){
  return gulp.src('./dist/*')
    .pipe(git.commit('Changes to dist-folder'));
});


//5. Push to VPS Server
gulp.task('push', function(){
  return git.push('live', 'digitalocean', {args: " -f"}, function (err) {
    if (err) throw err;
  });
});


/*********************************************************************************
* WATCH
/********************************************************************************/

/*
* Gulp watch
*/
gulp.task('watch', function() {
  // watch js
  gulp.watch(['app/js/app.js', 'app/js/controllers/*/*.js'], ['js-dist', 'js-dev']);
  // watch html
  gulp.watch('app/index.html', ['useref']);
  gulp.watch('app/templates/*', ['minify-html-template-root']);
  gulp.watch('app/templates/*/*.html', ['minify-html-templates-folders']);
  // watch randomAds images
  gulp.watch('app/img/randomAds/*', ['images-randomAds']);
  // watch scss
  gulp.watch(['app/css/scss/*.scss', 'app/css/scss/partials/*.scss'], ['sass', 'compress-css']);
  // watch regular css for changes and compress
  gulp.watch('app/css/style.css', ['compress-css']);
});

/*********************************************************************************
* DEFAULT
/********************************************************************************/

/*
* Gulp default
* this will do everything
*/
gulp.task('default', ['watch'])
