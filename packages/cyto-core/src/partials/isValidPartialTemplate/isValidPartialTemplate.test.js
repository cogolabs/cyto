import isValidPartialTemplate from './isValidPartialTemplate';

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
    expect(isValidPartialTemplate(VALID_CONFIG)).toBe(true);
  });

  it('returns false when not a partial', () => {
    expect(isValidPartialTemplate(INVALID_CONFIG1)).toBe(false);
    expect(isValidPartialTemplate(INVALID_CONFIG2)).toBe(false);
  })
});