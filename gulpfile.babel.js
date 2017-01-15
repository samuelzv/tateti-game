/**
 * Ta Te Ti build process
 *
 * Tasks are automatically loaded from '/gulp/tasks' folder.
 * Configuration located in '/gulp/config'
 */

import gulp from 'gulp';
import help from 'gulp-help';

import runSequence from 'run-sequence';
import requireDir from 'require-dir';

// patch gulp for help features
help(gulp, {hideDepsMessage: true});

// Automatically load tasks
requireDir('./gulp/tasks', {
  recurse: true
});


/**
 * By default start on dev mode
 */
gulp.task('default', ['dev']);


/**
 * Build application on development mode
 */
gulp.task('dev', 'Build application in development mode', cb => {
  runSequence(
    'cleanup',
     'dev.build',
    cb
  );
});






