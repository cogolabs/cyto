/* @flow */
/**
 * renderString.js
 * Written by: Connor Taylor
 */
import mustache from 'mustache';

import loadCytoConfig from '../../../configs/loadCytoConfig';
import loadTemplate from '../../../template/loadTemplate';
import types from '../../types';
import log from '../../log';

/**
 * Description of renderString
 *
 */
export default function renderString(str, args) {
  mustache.escape = (text) => text; // Don't escape html

  const renderPartial = (templateId, context) => {
    const template = loadTemplate(templateId);
    const cytoConfig = loadCytoConfig(templateId);

    if (!types.isPartial(cytoConfig)) {
      log.fatal(`${templateId} is not a partial!`);
    }

    return renderString(Object.values(template)[0], context);
  };

  return mustache.render(str, args, renderPartial);
}
