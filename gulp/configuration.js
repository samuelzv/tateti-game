import path from 'path';

const dist = 'dist';
const src = 'src';

let sourcePaths = {
  client: path.join(src, 'client'),
  server: path.join(src, 'server')
};

let distPaths = {
  client: path.join(dist, 'client'),
  server: path.join(dist, 'server')
};

export const CONFIGURATION = {
  paths: {
    dist: {
      client: distPaths.client,
      server: distPaths.server
    },
    src: {
      client: path.join(src, 'client'),
      clientConfiguration: ['karma*.js', 'systemjs.*.js', 'package.json'],
      clientTypeScriptDev: ['**/*.ts', '!**/*.e2e.ts', '!main.aot.ts', '!node_modules/**/*.ts'],
      clientAssets: ['**/*', '!**/*.ts', '!**/*.js', '!**/*.less', '!**/*.js.map', '!**/node_modules/**'],
      clientStyles: ['{assets,app,common}/**/*.less', '!{assets,app,common}/**/_*.less'],
      clientStylesImports: ['.', path.join(sourcePaths.client,'assets')],
      server: sourcePaths.server,
      libs: {
        js: [
          'node_modules/core-js/client/shim.js',
          'node_modules/zone.js/dist/zone.js',
          'node_modules/systemjs/dist/system.src.js',
          'systemjs.config.js'
        ]
      }
    }
  }
};



