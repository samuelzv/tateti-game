import gulp from 'gulp';
import changed from 'gulp-changed';

import {CONFIGURATION} from '../../configuration';

/**
 * Copies client assets to build folder
 */
gulp.task('dev.client.assets', 'Copies client assets to build folder', [], ()=> {
  let dest = CONFIGURATION.paths.dist.client;

  return gulp.src(CONFIGURATION.paths.src.clientAssets,
    {cwd: CONFIGURATION.paths.src.client})
    .pipe(changed(dest))
    .pipe(gulp.dest(dest))

});


