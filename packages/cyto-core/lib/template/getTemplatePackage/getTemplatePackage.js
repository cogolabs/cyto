/* @flow */
/**
 * getTemplatePackage.js
 * Written by: Connor Taylor
 */
import memoize from 'mem';
import types from '../../utils/types';
import evalRequire from '../../utils/evalRequire';

// If the first letter of a template string is an '@', the corresponding npm
// package must be under a scope
const SCOPE_TAG = '@';

/**
 * Takes a template id and returns the package name that holds that template.
 * Cyto supports npm scopes by having templates include the scope in their id.
 * For example, there can by a `cyto-template-react-component` package, which
 * would have the template id `react-component`, and there could also be a
 * `@taylorc93/cyto-template-react-component`, which would have a template id
 * of `@taylorc93/react-component`
 *
 * @param {string} templateId - The string to format
 */
const getTemplatePackage = (templateId) => {
  if (!types.isString(templateId)) {
    throw new Error(`${templateId} is not a string`);
  }

  const packageName = templateId[0] === SCOPE_TAG
    ? `${templateId.split('/')[0]}/cyto-template-${templateId.split('/')[1]}`
    : `cyto-template-${templateId}`;

  try {
    evalRequire(packageName);

    return packageName;
  } catch (e) {
    throw new Error(`Could not find package ${packageName} for ${templateId} in node_modules`);
  }
};

export default memoize(getTemplatePackage);
