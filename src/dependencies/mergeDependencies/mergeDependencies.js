/* @flow */
/**
 * mergeDependencies.js
 * Written by: Connor Taylor
 */

/**
 * Description of mergeDependencies
 * @param {  } deps -
 * @param {  } baseDeps -
 *
 */

export default function mergeDependencies(deps, baseDeps) {
  return deps.reduce((accum, dep) => {
    return [
      ...accum.filter((elem) => {
        return dep.id
          ? elem.id !== dep.id
          : elem !== dep;
        }
      ),
      dep,
    ];
  }, baseDeps);
}
