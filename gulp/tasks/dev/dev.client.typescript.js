import path from 'path';

import gulp from 'gulp';
import ts from 'gulp-typescript';
import changed from 'gulp-changed';
import sourcemaps from 'gulp-sourcemaps';

import {CONFIGURATION} from '../../configuration';

let tsProject = ts.createProject(path.join(CONFIGURATION.paths.src.client, 'tsconfig.json'), {
  typescript: require('typescript')
});

/**
 * Compile typescript sources to distribution dir
 */
gulp.task('dev.client.typescript', 'Compile typescript sources to build dir', ['dev.client.typelint'], () => {
  let dest = CONFIGURATION.paths.dist.client;

  return gulp.src(CONFIGURATION.paths.src.clientTypeScriptDev,
    {cwd: CONFIGURATION.paths.src.client})
    .pipe(sourcemaps.init())
    .pipe(changed(dest, {extension: '.js'}))
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));

});
