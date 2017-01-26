/* @flow */
/**
 * mergeCytoConfigs.js
 * Written by: Connor Taylor
 */
import mustache from 'mustache';

import loadCytoConfig from '../loadCytoConfig';
import mergeDependencies from '../../dependencies/mergeDependencies';
import file from '../../utils/file';

/**
 * Description of mergeCytoConfigs
 * @param {  } config -
 * @param {  } baseConfig -
 *
 */
export default function mergeCytoConfigs(config, baseConfig) {
  const newBase = baseConfig.base
    ? mergeCytoConfigs(baseConfig, loadCytoConfig(baseConfig.base))
    : baseConfig;

  const dependencies = mergeDependencies(
    config.dependencies,
    newBase.dependencies,
  );

  // console.log(dependencies);

  const args = dependencies
    .filter((dep) => typeof dep === 'string')
    .reduce((accum, dep) => {
      console.log(dep);
      const contents = file.loadUTF8FileSafe(dep);
      console.log(contents);
      // const tokens = mustache.parse(contents);
      // console.log(tokens);
    }, {});
}
