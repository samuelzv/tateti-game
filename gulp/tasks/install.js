import gulp from 'gulp';
import cp from 'child_process';
import {CONFIGURATION} from '../configuration';

/**
 * Install project dependencies
 */
gulp.task('install', 'Install client and server dependencies', ['install.client'], ()=>{
});

/**
 * Install client dependencies
 */
gulp.task('install.client', 'Install client dependencies', () =>{
  return cp.execSync('npm install', {cwd: CONFIGURATION.paths.src.client});
});

