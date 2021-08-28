// Packages
import { src, dest } from 'gulp';
import browserSync from 'browser-sync';
import color from 'ansi-colors';

// Gulp Plugins
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
// import rename from 'gulp-rename';

// PostCSS Plugins
import autoprefixer from 'autoprefixer';
// import cssnano from 'cssnano';

// Paths
import paths from './paths';

// Generate styles from scss
const styles = () => {
  console.log(color.bold.magenta('<--------------- SCSS --------------->'));

  // Task
  return src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
};

// Generate minified styles from scss
const stylesmin = async () => {
  console.log(color.bold.magenta('<--------------- SCSS --------------->'));
  return;
};

export {
  styles,
  stylesmin
};
