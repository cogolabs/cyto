/* @flow */
/**
 * mergeDependencies.test.js
 * Written by: Connor Taylor
 */
import mergeDependencies from './mergeDependencies';

describe('mergeDependencies', () => {
  it('returns the union of the two sets of dependencies', () => {
    const deps = [
      ['foo', 'cyto/test'],
      { templateId: 'cyto/test', args: { id: 'foo' } }
    ];
    const baseDeps = [
      ['bar', 'cyto/test'],
      { templateId: 'cyto/test', args: { id: 'bar' } }
    ];
    const newDeps = mergeDependencies(deps, baseDeps);

    expect(newDeps).toEqual([
      ['bar', 'cyto/test'],
      { templateId: 'cyto/test', args: { id: 'bar' } },
      ['foo', 'cyto/test'],
      { templateId: 'cyto/test', args: { id: 'foo' } },
    ]);
  });

  it('uniques array dependencies correctly', () => {
    const deps = [
      ['foo', 'cyto/test']
    ];
    const baseDeps = [
      ['foo', 'cyto/base']
    ];
    const newDeps = mergeDependencies(deps, baseDeps);

    expect(newDeps).toEqual([
      ['foo', 'cyto/test']
    ]);
  });

  it('only removes object dependencies with the same templateId and id arg', () => {
    const deps = [
      { templateId: 'cyto/test', args: { id: 'foo' } },
      { templateId: 'cyto/base', args: { id: 'foo' } }
    ];
    const baseDeps = [
      { templateId: 'cyto/test', args: { id: 'bar' } },
      { templateId: 'cyto/base', args: { id: 'foo' } }
    ];
    const newDeps = mergeDependencies(deps, baseDeps);

    expect(newDeps).toEqual([
      { templateId: 'cyto/test', args: { id: 'bar' } },
      { templateId: 'cyto/test', args: { id: 'foo' } },
      { templateId: 'cyto/base', args: { id: 'foo' } }
    ]);
  });

  it('doesnt do anything with function dependencies', () => {
    const f1 = () => 'foo';
    const f2 = () => 'bar';
    const deps = [f1];
    const baseDeps = [f2];

    const newDeps = mergeDependencies(deps, baseDeps);
    expect(newDeps).toEqual([f2, f1]);
  })
});
