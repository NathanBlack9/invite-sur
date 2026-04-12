import gulp from 'gulp'
// import browserSync from 'browser-sync'

gulp.task('watch', function() {
  gulp.watch("src/scss/**/*.+(scss|sass)", gulp.parallel('css'));
  // gulp.watch("src/html/*.html", gulp.parallel('minify-html'),browserSync.reload);
  gulp.watch("src/js/**/*.js", gulp.parallel('compressJs'));
});