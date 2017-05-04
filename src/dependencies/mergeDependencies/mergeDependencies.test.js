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

  it('uniques object dependencies correctly', () => {
    const deps = [
      { templateId: 'cyto/test', args: { id: 'foo' } }
    ];
    const baseDeps = [
      { templateId: 'cyto/base', args: { id: 'foo' } }
    ];
    const newDeps = mergeDependencies(deps, baseDeps);

    expect(newDeps).toEqual([
      { templateId: 'cyto/test', args: { id: 'foo' } }
    ]);
  });
});
