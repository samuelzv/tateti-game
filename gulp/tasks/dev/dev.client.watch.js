import gulp from 'gulp';
import path from 'path';
import {CONFIGURATION} from '../../configuration';

/**
 * Execute dev tasks when some source file change
 */
gulp.task('dev.client.watch', 'Watch client sources and execute the dev tasks when they change.',  () => {
  gulp.watch(CONFIGURATION.paths.src.clientTypeScriptDev, {cwd: CONFIGURATION.paths.src.client}, ['dev.client.typescript']);
  gulp.watch(CONFIGURATION.paths.src.clientStyles, {cwd: CONFIGURATION.paths.src.client}, ['dev.client.styles']);
  gulp.watch(CONFIGURATION.paths.src.clientAssets, {cwd: CONFIGURATION.paths.src.client}, ['dev.client.assets']);
  gulp.watch(CONFIGURATION.paths.src.clientConfiguration, {cwd: CONFIGURATION.paths.src.client}, ['dev.client.configuration']);

  var files = [
    path.join(CONFIGURATION.paths.dist.client, 'app/**/*.css'),
    path.join(CONFIGURATION.paths.dist.client, 'app/**/*.html'),
    path.join(CONFIGURATION.paths.dist.client, 'app/**/*.js')
  ];

  return gulp.watch(files);

});
