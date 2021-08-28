// Packages
import { watch, series } from 'gulp';
import browserSync from 'browser-sync';
import color from 'ansi-colors';

// Tasks
import { html } from './html';
import { styles } from './styles';
import { scripts } from './scripts';

// Paths
import paths from './paths';

// Watch files changes
const watcher = () => {
  // Watch html files changes
  watch(paths.html.src).on('change', () => {
    browserSync.reload();
    html();
  });
  // Watch scss files changes
  watch(paths.scss.src, series(styles));
  // Watch ts files changes
  watch(paths.ts.src, series(scripts));
};

// BrowserSync
const server = () => {
  console.log(color.bold.cyan('<-------------- Server -------------->'));
  browserSync.init({
    server: {
      baseDir: './build/',
    },
  });
};


export {
  watcher, server
};
