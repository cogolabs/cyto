/**
 * index.js
 * Written by: Connor Taylor
 *
 * This file exports all of the key functions in Cyto. generateTemplate is the
 * default export since it is the driver for the generation algorithm
 */

import getArgsForTemplate from './args/getArgsForTemplate';
import getRuntimeArgs from './args/getRuntimeArgs';
import isRuntimeArg from './args/isRuntimeArg';
import mergeArgs from './args/mergeArgs';
import parseListArg from './args/parseListArg';
import promptForArg from './args/promptForArg';
import validateTemplateArgs from './args/validateTemplateArgs';
import getAuthorArg from './args/getAuthorArg';

import loadCytoConfig from './configs/loadCytoConfig';
import mergeCytoConfigs from './configs/mergeCytoConfigs';
import validCytoConfig from './configs/validCytoConfig';

import generateTemplate from './template/generateTemplate';
import getTemplatePackage from './template/getTemplatePackage';
import loadTemplate from './template/loadTemplate';
import validateTemplate from './template/validateTemplate';
import writeTemplate from './template/writeTemplate';

import file from './utils/file';
import func from './utils/func';
import log from './utils/log';
import types from './utils/types';

export {
  getArgsForTemplate,
  getRuntimeArgs,
  isRuntimeArg,
  mergeArgs,
  parseListArg,
  promptForArg,
  validateTemplateArgs,
  getAuthorArg,

  loadCytoConfig,
  mergeCytoConfigs,
  validCytoConfig,

  generateTemplate,
  getTemplatePackage,
  loadTemplate,
  validateTemplate,
  writeTemplate,

  file,
  func,
  log,
  types,
};

export default generateTemplate;
