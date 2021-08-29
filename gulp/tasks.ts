// Packages
import { watch, series } from 'gulp';
import browserSync from 'browser-sync';
import color from 'ansi-colors';
import yargs from 'yargs/yargs';

// Tasks
import { html } from './html';
import { styles } from './styles';
import { scripts } from './scripts';

// Paths
import paths from './paths';

// Get the component
const parser = yargs(process.argv.slice(2)).options({
  component: {
    type: 'string',
    default: undefined,
  },
});

// Watch files changes
const watcher = async () => {
  // Get the component name
  const argv = await parser.argv;
  const component = argv.component;

  // Watch html files changes
  watch(component ? `./src/components/${component}/*.html` : paths.html.src).on(
    'change',
    () => {
      browserSync.reload();
      html();
    }
  );

  // Watch scss files changes
  watch(
    component ? `./src/components/${component}/scss/**/*.scss` : paths.scss.src,
    series(styles)
  );

  // Watch ts files changes
  watch(
    component ? `./src/components/${component}/ts/**/*.ts` : paths.ts.src,
    series(scripts)
  );
};

// BrowserSync
const server = async () => {
  // Get the component name
  const argv = await parser.argv;
  const component = argv.component;

  console.log(color.bold.cyan('<-------------- Server -------------->'));

  // Task
  browserSync.init({
    server: {
      baseDir: component ? `./src/components/${component}/` : './build/',
    },
  });
};

export { watcher, server };
