const CONFIG = {
  templateId: 'foo/bar',
  dependencies: ['foo'],
  args: [],
  options: {
    foo: 'bar',
  }
};

const BASE_CONFIG = {
  templateId: 'foo/bar',
  dependencies: ['bar'],
  args: [],
  options: {
    bar: 'baz'
  }
};

export default {
  CONFIG,
  BASE_CONFIG,
};
