import gulp from 'gulp';
import path from 'path';
import inject from 'gulp-inject';

import {CONFIGURATION} from '../../configuration';

/**
 * Builds index.html file for development
 */
gulp.task('dev.client.index', 'Builds index.html file for development', () => {
  let srcIndex = path.join(CONFIGURATION.paths.src.client, 'index.html');

  return gulp.src(srcIndex)
    .pipe(injectJsLibs())
    .pipe(gulp.dest(CONFIGURATION.paths.dist.client));

});

function injectJsLibs() {
  let jsLibsPath = path.join(CONFIGURATION.paths.src.client);
  let sources = gulp.src(CONFIGURATION.paths.src.libs.js, {cwd: jsLibsPath});
  return inject(sources, {relative: true, addRootSlash: true});
}
