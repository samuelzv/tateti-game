import gulp from 'gulp';
import tslint from 'gulp-tslint';
import changed from 'gulp-changed';

import {CONFIGURATION} from '../../configuration';

gulp.task('dev.client.typelint','Apply lint rules to typescript files', [], ()=> {
  let dest = CONFIGURATION.paths.dist.client;
  //.pipe(changed(dest))

  return gulp.src(CONFIGURATION.paths.src.clientTypeScriptDev, {cwd:CONFIGURATION.paths.src.client})
    .pipe(changed(dest))
    .pipe(tslint({
      configuration: "tslint.json",
      formatter: 'prose'
    }))
    .pipe(tslint.report())

});
