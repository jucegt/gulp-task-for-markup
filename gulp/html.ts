// Packages
import { src, dest } from 'gulp';
import color from 'ansi-colors';

// Gulp Plugins
import replace from 'gulp-replace';

// Paths
import paths from './paths';

// Move html to dist
const html = () => {
  console.log(color.bold.gray('<--------------- HTML --------------->'));
  return src(paths.html.src)
    .pipe(replace('assets/scss/', 'css/'))
    .pipe(replace('assets/ts/', 'js/'))
    .pipe(replace('.scss', '.css'))
    .pipe(replace('.ts', '.js'))
    .pipe(dest(paths.html.dest));
};

// Generate minified html
const htmlmin = async () => {
  console.log(color.bold.gray('<--------------- HTML --------------->'));
  return;
};

export {
  html,
  htmlmin
};
