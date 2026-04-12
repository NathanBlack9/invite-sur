import gulp from 'gulp'
import cleanCSS from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
// import browserSync from 'browser-sync'
import gulpSass from 'gulp-sass';
import dartSass from 'sass';

const sass = gulpSass(dartSass);

gulp.task('css', function() {
  return gulp.src("src/scss/**/*.+(scss|sass)")
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
          overrideBrowserslist:  ['last 2 versions'],
          cascade: false
      }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest("build/styles"))
    //   .pipe(browserSync.stream());
});