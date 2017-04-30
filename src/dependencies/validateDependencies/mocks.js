const INVALID_TYPE1 = [1];

const INVALID_TYPE2 = [true];

const INVALID_TYPE3 = [[]];

const NO_TEMPLATEID = [
  { args: {} }
];

const NO_ARGS = [
  { templateId: 'cyto/foo' }
];

const NO_ARGS_ID = [
  { templateId: 'cyto/foo', args: {} },
];

export default {
  INVALID_TYPE1,
  INVALID_TYPE2,
  INVALID_TYPE3,
  NO_TEMPLATEID,
  NO_ARGS,
  NO_ARGS_ID,
};
