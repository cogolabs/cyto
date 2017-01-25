/* @flow */
/**
 * generateTemplate.js
 * Written by: Connor Taylor
 */
import formatTemplateString from '../formatTemplateString';
import validateTemplate from '../validateTemplate';

type GenerateOptions = {
  templateString: string,
  args: string[],
  outputRoot: string,
};

/**
 * Driver for the template generation algorithm. The algorithm can be broken
 * down into these steps:
 *
 * @param {object} options - Options to tweak the template generation
 */
export default function generateTemplate(options: GenerateOptions) {
  const {
    templateString,
    // args,
    // outputRoot,
  } = options;

  const templateId = formatTemplateString(templateString);
  console.log(templateId);
  validateTemplate(templateId);
}
