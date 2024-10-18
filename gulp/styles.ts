// Packages
import { src, dest } from 'gulp';
import browserSync from 'browser-sync';
import color from 'ansi-colors';
import yargs from 'yargs/yargs';

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

// Get the component
const parser = yargs(process.argv.slice(2)).options({
  component: {
    type: 'string',
    default: undefined,
  },
});

// Generate styles from scss
const styles = async () => {
  // Get the component name
  const argv = await parser.argv;
  const component = argv.component;

  console.log(color.bold.magenta('<--------------- SCSS --------------->'));

  // Task
  return src(
    component ? `./src/components/${component}/scss/**/*.scss` : paths.scss.src
  )
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(
      dest(component ? `./src/components/${component}/css/` : paths.scss.dest)
    )
    .pipe(browserSync.stream());
};

// Generate minified styles from scss
const stylesmin = async () => {
  console.log(color.bold.magenta('<--------------- SCSS --------------->'));
  return;
};

export { styles, stylesmin };
