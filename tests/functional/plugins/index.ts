// @ts-ignore
import { initPlugin } from 'cypress-plugin-snapshots/plugin';
// @ts-ignore
import * as browserify from '@cypress/browserify-preprocessor';

module.exports = (on: any, config: any): void => {
  initPlugin(on, config);

  on(
    'file:preprocessor',
    browserify({
      typescript: require.resolve('typescript'),
    })
  );

  on('task', {
    log(message: string): void {
      console.log(message);
    },
  });

  return config;
};
