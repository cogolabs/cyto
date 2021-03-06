const NOT_OBJECT = 'bad config';

const MISSING_KEYS = [
  {
    templateId: 'foo/bar',
    dependencies: [],
    args: [],
  },
  {
    templateId: 'foo/bar',
    dependencies: [],
    options: {}
  },
  {
    templateId: 'foo/bar',
    args: [],
    options: {}
  },
  {
    dependencies: [],
    args: [],
    options: {}
  }
];

const INVALID_KEY_TYPES = [
  {
    templateId: 1, // invalid
    dependencies: [],
    args: [],
    options: {}
  },
  {
    templateId: 'foo/bar',
    dependencies: 1, // invalid
    args: [],
    options: {}
  },
  {
    templateId: 'foo/bar',
    dependencies: [],
    args: 1, // invalid
    options: {}
  },
  {
    templateId: 'foo/bar',
    dependencies: [],
    args: [],
    options: 1 // invalid
  }
];

const INVALID_BASE_KEYS =[
  {
    base: '',
    templateId: 'foo/bar',
    dependencies: ['foo'],
    args: [],
    options: {}
  },
  {
    base: {
      templateId: 'foo/bar',
    },
    templateId: 'foo/bar',
    dependencies: ['foo'],
    args: [],
    options: {}
  },
  {
    base: {
      args: {},
    },
    templateId: 'foo/bar',
    dependencies: ['foo'],
    args: [],
    options: {}
  }
]

const INVALID_DEPENDENCY_LENGTH = {
  templateId: 'foo/bar',
  dependencies: [],
  args: [],
  options: {}
}

const VALID_CONFIG = {
  templateId: 'foo/bar',
  dependencies: ['foo'],
  args: [],
  options: {}
}

export default {
  NOT_OBJECT,
  MISSING_KEYS,
  INVALID_KEY_TYPES,
  INVALID_DEPENDENCY_LENGTH,
  INVALID_BASE_KEYS,
  VALID_CONFIG,
};
