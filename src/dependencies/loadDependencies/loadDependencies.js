/* @flow */
/**
 * loadDependencies.js
 * Written by: Connor Taylor
 */

/**
 * Description of loadDependencies
 *
 */

export default function loadDependencies(cytoConfig, args) {
  return [
    ...cytoConfig.dependencies.filter((d) => typeof d !== 'function'),
    ...cytoConfig.dependencies
      .filter((dep) => typeof dep === 'function')
      .reduce((accum, func) => {
        const result = func(args);
        return Array.isArray(result)
          ? [...accum, ...result]
          : [...accum, result];
      }, []),
  ];
}
