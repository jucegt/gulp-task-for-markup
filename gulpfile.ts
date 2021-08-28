// Packages
import { series, parallel } from 'gulp';
import color from 'ansi-colors';

// Tasks
import { server, watcher } from './gulp/tasks';
import { html, htmlmin } from './gulp/html';
import { styles, stylesmin } from './gulp/styles';
import { scripts, scriptsmin } from './gulp/scripts';

// Start gulp
console.log(color.bold.yellow('<----------- Runing Tasks ----------->'));

// Develop
const dev = series(html, styles, scripts, parallel(server, watcher));

// Build
const build = series(htmlmin, stylesmin, scriptsmin, parallel(server));

exports.dev = dev;
exports.build = build;
exports.default = build;
