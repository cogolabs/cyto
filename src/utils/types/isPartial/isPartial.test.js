/* @flow */
/**
 * isPartial.test.js
 * Written by: Connor Taylor
 */
import isPartial from './isPartial';

const VALID_CONFIG = {
  templateId: 'cyto/partial',
  dependencies: [
    // String deps are converted to arrays in loadCytoConfig
    ['foo.js', 'cyto/partial'],
  ],
  args: [],
  options: {},
};

const INVALID_CONFIG1 = {
  templateId: 'cyto/partial',
  dependencies: [
  ],
  args: [],
  options: {},
};

const INVALID_CONFIG2 = {
  templateId: 'cyto/partial',
  dependencies: [
    ['foo.js', 'cyto/partial'],
    ['bar.js', 'cyto/partial'],
  ],
  args: [],
  options: {},
};

describe('isPartial', () => {
  it('returns true when partial', () => {
    expect(isPartial(VALID_CONFIG)).toBe(true);
  });

  it('returns false when not a partial', () => {
    expect(isPartial(INVALID_CONFIG1)).toBe(false);
    expect(isPartial(INVALID_CONFIG2)).toBe(false);
  })
});
