/* @flow */
/**
 * mergeCytoConfigs.test.js
 * Written by: Connor Taylor
 */
import mocks from './mocks';
import mergeCytoConfigs from './mergeCytoConfigs';

import mergeArgs from '../../args/mergeArgs';
import mergeDependencies from '../../dependencies/mergeDependencies';

jest.mock('../../args/mergeArgs');
jest.mock('../../dependencies/mergeDependencies');

describe('mergeCytoConfigs', () => {
  it('calls mergeArgs and mergeDependencies', () => {
    mergeCytoConfigs(mocks.CONFIG, mocks.BASE_CONFIG);

    expect(mergeArgs).toBeCalled();
    expect(mergeDependencies).toBeCalled();
  });

  it('does not copy the base template options', () => {
    const newConfig = mergeCytoConfigs(mocks.CONFIG, mocks.BASE_CONFIG);

    expect(newConfig.options).toEqual({ foo: 'bar' });
  });
});
