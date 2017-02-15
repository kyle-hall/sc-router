
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('static/*.js').on('change', browserSync.reload);
  gulp.watch('static/superstyles.css').on('change', browserSync.reload);
  gulp.watch('index.html').on('change', browserSync.reload);
});
