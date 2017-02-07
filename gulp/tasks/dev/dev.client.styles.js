import path from 'path';

import gulp from 'gulp';
import changed from 'gulp-changed';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';

import {CONFIGURATION} from '../../configuration';

/**
 * Compiles less files to build folder
 */
gulp.task('dev.client.styles', 'Compiles less files to build folder', () => {
  let dest = CONFIGURATION.paths.dist.client;

  return gulp.src(CONFIGURATION.paths.src.clientStyles,{cwd: CONFIGURATION.paths.src.client})
    .pipe(changed(dest), {extension: '.css'})
    .pipe(less({
      paths: CONFIGURATION.paths.src.clientStylesImports
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(dest));

});
