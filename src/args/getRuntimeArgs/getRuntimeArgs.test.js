import getRuntimeArgs from './getRuntimeArgs';

const CYTO_CONFIG = {
  templateId: 'foo/bar',
  deps: ['foo.txt'],
  args: [
    { id: 'not runtime' },
    {
      id: 'runtime',
      type: 'list',
      default: (args) => {
        return args.foo
      }
    }
  ],
  options: {},
}

describe('getRuntimeArgs', () => {
  it('returns a new set of args', () => {
    const suppliedArgs = { foo: 'bar' };
    const newArgs = getRuntimeArgs(CYTO_CONFIG, suppliedArgs);

    expect(newArgs).toEqual({
      foo: 'bar',
      runtime: 'bar',
    });

    // Should not modify the other object
    expect(Object.keys(suppliedArgs).length).toBe(1);
  });
});
