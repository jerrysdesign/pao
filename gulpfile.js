var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    pug         = require('gulp-pug'),
    plumber     = require('gulp-plumber'),
    watch       = require('gulp-watch'),
    uglify      = require('gulp-uglify'),
    cssnano     = require('gulp-cssnano'),
    sourcemaps  = require('gulp-sourcemaps'),
    imagemin    = require('gulp-imagemin');
    npmDist     = require('gulp-npm-dist');

var cfg = {
  'src': 'src/',
  'build': 'dist/'
}

gulp.task('copy:vendors', function() {
  gulp.src(npmDist(), {base:'./node_modules'})
    .pipe(gulp.dest(cfg.src + 'vendors'));
});

gulp.task('copy:build', function () {
  gulp.src(cfg.src + 'vendors'+ '/**/*')
    .pipe(gulp.dest(cfg.build + 'vendors' + '/'));
});

gulp.task('styles', function(){
  gulp.src(cfg.src + 'sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cfg.build + 'css/'));
});

gulp.task('views', function buildHTML() {
  gulp.src(cfg.src + 'pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(cfg.build));
});

gulp.task('js', function () {
  gulp.src(cfg.src + 'scripts/*.js')
  .pipe(plumber())
  .pipe(gulp.dest(cfg.build + 'scripts/'));
});

gulp.task('image-min', function(){
  gulp.src(cfg.src + 'img/*')
    .pipe(imagemin())
    .pipe(gulp.dest(cfg.build + 'images'));
});

gulp.task('serve', ['copy:vendors', 'styles', 'views', 'js', 'image-min'], function() {
  browserSync.init({
    server: {
      baseDir: cfg.build
    }
  });
  gulp.watch(cfg.src + 'sass/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch(cfg.src + 'pug/**/*.pug', ['views']).on('change', browserSync.reload);
  gulp.watch(cfg.src + 'scripts/**/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch(cfg.src + 'img/**/*', ['image-min']).on('change', browserSync.reload);
  // gulp.watch('app/dist/**/*').on('change', browserSync.reload);
});

gulp.task('js-min', function(){
  gulp.src(cfg.build + 'scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(cfg.build + 'scripts'));
});

gulp.task('css-min', function(){
  gulp.src(cfg.build + 'css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest(cfg.build + 'css'));
});

gulp.task('default', ['serve', 'copy:vendors']);

gulp.task('copy', ['copy:vendors', 'copy:build']);

gulp.task('build', ['copy', 'image-min', 'js-min', 'css-min']);
