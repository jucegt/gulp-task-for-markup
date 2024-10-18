// Packages
import { src, dest } from 'gulp';
import color from 'ansi-colors';
import yargs from 'yargs/yargs';

// Gulp Plugins
import sourcemaps from 'gulp-sourcemaps';
import ts from 'gulp-typescript';
// import uglify from 'gulp-uglify';
// import rename from 'gulp-rename';

// Paths
import paths from './paths';

// Get the component
const parser = yargs(process.argv.slice(2)).options({
  component: {
    type: 'string',
    default: undefined,
  },
});

// Generate scripts from ts
const scripts = async () => {
  // Get the component name
  const argv = await parser.argv;
  const component = argv.component;

  console.log(color.bold.blue('<---------------- TS ---------------->'));

  // Config
  const tsconfig = ts.createProject('tsconfig.json');
  const reporter = ts.reporter.fullReporter();

  // Reporter
  const result = src(
    component ? `./src/components/${component}/ts/**/*.ts` : paths.ts.src
  )
    .pipe(sourcemaps.init())
    .pipe(tsconfig(reporter));

  // Task
  return result.js
    .pipe(sourcemaps.write('.'))
    .pipe(
      dest(component ? `./src/components/${component}/js/` : paths.ts.dest)
    );
};

// Generate minified scripts from ts
const scriptsmin = async () => {
  console.log(color.bold.blue('<---------------- TS ---------------->'));
  return;
};

export { scripts, scriptsmin };
