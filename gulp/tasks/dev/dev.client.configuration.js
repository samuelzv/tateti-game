import gulp from 'gulp';

import {CONFIGURATION} from '../../configuration';

/**
 * Copies configuration files to client dist folder
 */
gulp.task('dev.client.configuration', 'Copies configuration files to client dist folder', () => {
  let base = CONFIGURATION.paths.src.client;
  return gulp.src(CONFIGURATION.paths.src.clientConfiguration, {cwd: base, base: base})
    .pipe(gulp.dest(CONFIGURATION.paths.dist.client));
});
