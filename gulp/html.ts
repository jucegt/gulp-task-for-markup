// Packages
import { src, dest } from 'gulp';
import color from 'ansi-colors';
import yargs from 'yargs/yargs';

// Gulp Plugins
import replace from 'gulp-replace';

// Paths
import paths from './paths';

// Get the component
const parser = yargs(process.argv.slice(2)).options({
  component: {
    type: 'string',
    default: undefined,
  },
});

// Move html to dist
const html = async () => {
  // Get the component name
  const argv = await parser.argv;
  const component = argv.component;

  console.log(color.bold.gray('<--------------- HTML --------------->'));

  // Do nothing if it is a component
  if (component) return;

  // Task
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

export { html, htmlmin };
