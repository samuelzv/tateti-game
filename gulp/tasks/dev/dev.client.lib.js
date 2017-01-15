import path from 'path';
import gulp from 'gulp';
import del from 'del';
import vinyl from 'vinyl-fs';

import {CONFIGURATION} from '../../configuration';

const DEPENDENCIES_DIRNAME = 'node_modules';

/**
 * Link node_modules to libs to build folder
 */
gulp.task('dev.client.lib', 'Link third party libs to build folder',
  [],
  () => {
    del.sync([path.join(CONFIGURATION.paths.dist.client, DEPENDENCIES_DIRNAME)]);
    return vinyl.src(path.join(CONFIGURATION.paths.src.client, DEPENDENCIES_DIRNAME), {followSymlinks: false})
      .pipe(vinyl.symlink(CONFIGURATION.paths.dist.client));
  });

