// Packages
import { src, dest } from 'gulp';
import color from 'ansi-colors';

// Gulp Plugins
import sourcemaps from 'gulp-sourcemaps';
import ts from 'gulp-typescript';
// import uglify from 'gulp-uglify';
// import rename from 'gulp-rename';

// Paths
import paths from './paths';

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
};

// Generate minified scripts from ts
const scriptsmin = async () => {
  console.log(color.bold.blue('<---------------- TS ---------------->'));
  return;
};

export {
  scripts,
  scriptsmin
};
