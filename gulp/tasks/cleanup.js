import gulp from 'gulp';
import del from 'del';

import { CONFIGURATION } from '../configuration';

/**
 * Delete dist client and server
 */
gulp.task('cleanup', 'Delete dist client and server files', ['cleanup.client', 'cleanup.server']);

gulp.task('cleanup.client', 'Delete dist client files', () => {
  return del.sync(['**/*', '!node_modules/**'],
                  {cwd: CONFIGURATION.paths.dist.client});
});

gulp.task('cleanup.server', 'Delete dist server files', () => {
  return del.sync(['**/*', '!node_modules/**'],
                  {cwd: CONFIGURATION.paths.dist.server});
});
