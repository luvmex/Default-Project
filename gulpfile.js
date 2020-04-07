const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const rename = require('gulp-rename');
// const concat = require('gulp-concat');

//script
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');

//image
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
//
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const rupture = require('rupture');
const mqpacker = require('css-mqpacker');
const sourcemaps = require('gulp-sourcemaps');
//
const pug = require('gulp-pug');
//
const del = require('del');


const paths = {
  src: 'dev/**',
  dest: 'build'
}

 //Before build file clean the old one
gulp.task('clean', function(cb) {
  del(['build'], cb)
});


//Compile the jshint scripts
function scripts() {
  return gulp.src('dev/js/*.js')
    .pipe(jshint())
    // .pipe(concat('js.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream())
}
exports.scripts = scripts;


//Compile the layout to html
function layout() {
  return gulp.src('dev/layout/**/!(_)*.pug')
      .pipe(pug())
      .pipe(gulp.dest('build'))
      .pipe(browserSync.stream())
}
exports.layout = layout;


//Compile the stylus to css
function style() {
  const processors = [
    require('lost'),
    require('autoprefixer')({ browsers: ['last 5 version']}),
      require('css-mqpacker'),
      require('cssnano')({zindex: false, reduceIdents: false})
  ];
  return gulp.src(['dev/css/**/!(_)*.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({ use: rupture(), compress: true }))
    .pipe(postcss(processors))
    // .pipe(sourcemaps.write('.'))
    // .pipe(concat('css.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream())
}
exports.style = style;

// Images
function image() {
  return gulp.src('dev/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream())
}
gulp.task(image);

// Watch the file if it change
function watch() {
  browserSync.init({
      server: "build"
  });
  gulp.watch('dev/css/**/*.styl', style);
  gulp.watch('dev/js/*.js', scripts);
  gulp.watch('dev/layout/**/*.pug', layout);
}
exports.watch = watch;


gulp.task('copy', function () {
    return gulp.src(['dev/lib/**'])
    .pipe(gulp.dest('build/lib'));
});


gulp.task('default', gulp.series(layout, style, scripts, image, watch));




