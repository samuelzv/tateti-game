import gulp from 'gulp';
import runSequence from 'run-sequence';

/**
 * Watch server and client sources and execute the dev tasks when they change
 */
gulp.task('dev.watch', 'Watch server and client sources and execute the dev tasks when they change', cb => runSequence('dev.client.watch', cb));
