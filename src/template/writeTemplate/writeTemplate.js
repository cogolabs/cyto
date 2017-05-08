/* @flow */
/**
 * writeTemplate.js
 * Written by: Connor Taylor
 *
 * Outputs a template to the filesystem
 */
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

/**
 * Given a generated template object, writes the template's files to the
 * filesystem relative to the provided output root.
 *
 * @param { Object } templateObject - The generated template object to write
 * @param { string } outputRoot - The root location to output to
 */
export default function writeTemplate(templateObject, outputRoot) {
  Object.keys(templateObject).forEach((filePath) => {
    const outputPath = path.join(outputRoot, filePath);
    const contents = templateObject[filePath];

    mkdirp.sync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, contents);
  });
}
