import gulp from 'gulp'
import browserSync from 'browser-sync'

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});