// Packages
import { watch, series, parallel, src, dest } from 'gulp';
import browserSync from 'browser-sync'
import color from 'ansi-colors';

// Gulp Plugins
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import ts from 'gulp-typescript';
// import uglify from 'gulp-uglify';
// import rename from 'gulp-rename';

// PostCSS Plugins
import autoprefixer from 'autoprefixer';
// import cssnano from 'cssnano';

// Paths
const paths = {
  html: {
    src: './src/*.html',
    dest: './build/',
  },
  scss: {
    src: './src/assets/scss/**/*.scss',
    dest: './build/css/',
  },
  ts: {
    src: './src/assets/ts/**/*.ts',
    dest: './build/js/',
  },
};

console.log(color.bold.yellow('<----------- Runing Tasks ----------->'));

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

// Generate scripts from ts
const scripts = () => {
  console.log(color.bold.blue('<---------------- TS ---------------->'));

  // Config
  const tsconfig = ts.createProject('tsconfig.json');
  const reporter = ts.reporter.fullReporter();

  const result = src(paths.ts.src)
    .pipe(sourcemaps.init())
    .pipe(tsconfig(reporter));

  return result.js.pipe(sourcemaps.write('.')).pipe(dest(paths.ts.dest));
}

// Generate minified scripts from ts
const scriptsmin = async () => {
  console.log(color.bold.blue('<---------------- TS ---------------->'));
  return;
}

// Move html to dist
const html = () => {
  console.log(color.bold.gray('<--------------- HTML --------------->'));
  return src(paths.html.src).pipe(dest(paths.html.dest));
}

// Generate minified html
const htmlmin = async () => {
  console.log(color.bold.gray('<--------------- HTML --------------->'));
  return;
};

// Watch files changes
const watcher = () => {
  // Watch html files changes
  watch(paths.html.src).on('change', browserSync.reload);
  // Watch scss files changes
  watch(paths.scss.src, series(styles));
  // Watch ts files changes
  watch(paths.ts.src, series(scripts));
}

// BrowserSync
const server = () => {
  console.log(color.bold.cyan('<-------------- Server -------------->'));
  browserSync.init({
    server: {
      baseDir: './build/',
    },
  });
}

// Develop
const dev = series(html, styles, scripts, parallel(server, watcher));

// Build
const build = series(htmlmin, stylesmin, scriptsmin, parallel(server));

exports.dev = dev;
exports.build = build;
exports.default = build;
