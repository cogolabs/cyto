/**
 * parsePartialString.js
 * Written by: Connor Taylor
 */
import mustache from '../../utils/mustache';

/* Given a string, validates that it is a valid partial string and parses it.
 */
const parsePartialString = async (partialString, context) => {
  const tokens = partialString.split(' ').filter((s) => s.trim());
  if (!tokens.length || tokens.length > 2) {
    throw new Error(`Invalid partial string ${partialString}`);
  } else if (tokens.length === 1) {
    if (context.id) {
      tokens.push(context.id);
    } else {
      throw new Error(`${partialString} has no id.
Either set one explicity or make sure that the partial's rendering context has an id`);
    }
  }

  const [rawId, id] = tokens;
  const templateId = await mustache.render(rawId, context);

  return [templateId, id];
};

export default parsePartialString;
