/**
 * parsePartialString.js
 * Written by: Connor Taylor
 */
import fumanchu from 'fu-manchu';

/**
 * Given a string, validates that it is a valid partial string and parses it.
 * Passes the string inside of the partial tag through the fumanchu renderer
 * to allow for dynamic setting of the template or the template id.
 */
const parsePartialString = async (partialString, context) => {
  try {
    const renderedString = await fumanchu.render(partialString, context);
    const tokens = renderedString.split(' ').filter((s) => s.trim());
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
    const templateId = await fumanchu.render(rawId, context);

    return [templateId, id];
  } catch (e) {
    throw new Error(e);
  }
};

export default parsePartialString;
