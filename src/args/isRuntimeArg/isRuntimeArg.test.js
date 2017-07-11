import isRuntimeArg from './isRuntimeArg';

const RUNTIME_ARGS = [
  { id: 'foo', type: 'list', default: () => ['foo'] },
  { id: 'bar', type: 'string', default: () => 'foo' },
  { id: 'baz', type: 'boolean', default: () => false },
];

const NOT_RUNTIME_ARGS = [
  { id: 'foo', type: 'function', default: () => 'foo' },
  { id: 'foo', type: 'list', default: [] },
  { id: 'bar', type: 'string', default: '' },
  { id: 'baz', type: 'boolean', default: false },
];

describe('isRuntimeArg', () => {
  it('returns false when not a runtime arg', () => {
    NOT_RUNTIME_ARGS.forEach((a) => {
      expect(isRuntimeArg(a)).toBe(false);
    });
  });

  it('returns true when it is a runtime arg', () => {
    RUNTIME_ARGS.forEach((a) => {
      expect(isRuntimeArg(a)).toBe(true);
    });
  });
});
