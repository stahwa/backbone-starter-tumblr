var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		concat = require('gulp-concat'),
    sass = require('gulp-sass'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream');

var environment = 'development';
var paths = {
  src: './app/',
  dest: './public/',
  vendor: './vendor/',
  assets: './assets/'
}


gulp.task('set-production', function() {
  environment = 'production';
});

//gulp.task('copyFonts', function () {
//  return gulp.src(['./bower_components/fontawesome/css/*',
//    './bower_components/fontawesome/fonts/*'], {
//    base: 'bower_components'
//  }).pipe(gulp.dest(paths.dest+paths.assets+'fonts'));
//});

// gulp.task('copyFonts', function () {
//  return gulp.src([paths.src+'assets/fonts/font-awesome/*'], {
//    base: 'app/assets/fonts'
//  }).pipe(gulp.dest(paths.dest+paths.assets+'fonts'));
// });

gulp.task('html', function() {
  gulp.src(paths.src + 'index.html')
    .pipe(plumber())
    .pipe(gulp.dest(paths.dest))
});

gulp.task('styles', function() {
  return gulp.src(['bower_components/swiper/dist/css/swiper.min.css',
    // 'bower_components/fontawesome/css/font-awesome.min.css',
    paths.src + '**/site/styles/*.scss',
    paths.src + '**/styles/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.dest+'styles'));
});

var browserifyConfig = {
  entries: ['./app/main.js'],
  paths: ['./app']
};

gulp.task('browserify', function() {
  return browserify(browserifyConfig)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.dest + 'scripts/'));
});


gulp.task('vendor', function() {
  stream = gulp.src([
  		paths.src + '../bower_components/jquery/dist/jquery.min.js',
      paths.src + '../bower_components/swiper/dist/js/swiper.jquery.min.js',
      paths.src + '../node_modules/gsap/src/minified/TweenMax.min.js',
  		paths.src + '../node_modules/backbone/node_modules/underscore/underscore-min.js',
      paths.src + '../node_modules/backbone/backbone-min.js'

    ])
    .pipe(plumber())
    .pipe(concat("vendor.js"))

  if (environment == 'production') {
    stream.pipe(uglify())
  }

  stream.pipe(gulp.dest(paths.dest + 'scripts/'))
});

gulp.task('scripts', function() {
  stream = gulp.src(paths.src + 'main.js')
    .pipe(plumber())
    .pipe(concat('main.js'))

  if (environment == 'production') {
    stream.pipe(uglify())
  }

  // stream.pipe(gulp.dest(paths.dest + 'scripts/'))
});


gulp.task('watch', function(){

  gulp.watch(paths.src + '**/*.js', ['browserify']);
  gulp.watch(paths.src + '**/*.hbs', ['browserify']);
  gulp.watch(paths.src + '**/styles/*.scss', ['styles']);
  gulp.watch(paths.src + 'index.html', ['html']);
});

gulp.task('compile', ['html', 'styles', 'browserify']);
gulp.task('default', ['vendor', 'compile', 'watch']);
