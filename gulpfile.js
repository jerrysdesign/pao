var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    pug         = require('gulp-pug'),
    plumber     = require('gulp-plumber'),
    watch       = require('gulp-watch'),
    uglify      = require('gulp-uglify'),
    cssnano     = require('gulp-cssnano'),
    imagemin    = require('gulp-imagemin');

var cfg = {
  'src': 'src/',
  'build': 'dist/'
}


gulp.task('styles', function(){
  gulp.src(cfg.src + 'sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
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

gulp.task('serve', ['styles', 'views', 'js'], function() {
  browserSync.init({
    server: {
      baseDir: cfg.build
    }
  });
  gulp.watch(cfg.src + 'sass/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch(cfg.src + 'pug/**/*.pug', ['views']).on('change', browserSync.reload);
  gulp.watch(cfg.src + 'scripts/**/*.js', ['js']).on('change', browserSync.reload);
  // gulp.watch('app/dist/**/*').on('change', browserSync.reload);
});

gulp.task('image-min', function(){
  gulp.src(cfg.build + 'img/*')
    .pipe(imagemin())
    .pipe(gulp.dest(cfg.build + 'img'));
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

gulp.task('default', ['serve']);

gulp.task('build', ['image-min', 'js-min', 'css-min']);

  // .pipe(browserSync.reload({stream: true}))
