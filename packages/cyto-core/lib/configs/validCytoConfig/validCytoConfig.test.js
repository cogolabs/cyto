/* @flow */
/**
 * validCytoConfig.test.js
 * Written by: Connor Taylor
 */
import validCytoConfig from './validCytoConfig';
import mocks from './mocks';

describe('validCytoConfig', () => {
  it('throws if the config is not an object', () => {
    expect(() => validCytoConfig(mocks.NOT_OBJECT, 'foo/bar')).toThrow();
  });

  it('throws if any of the required keys are missing', () => {
    mocks.MISSING_KEYS.forEach((c) => {
      expect(() => validCytoConfig(c, 'foo/bar')).toThrow();
    });
  });

  it('throws if any of the required keys are not the right type', () => {
    mocks.INVALID_KEY_TYPES.forEach((c) => {
      expect(() => validCytoConfig(c, 'foo/bar')).toThrow();
    });
  });

  it('throws if any of the required keys are not the right type', () => {
    expect(() => validCytoConfig(mocks.INVALID_DEPENDENCY_LENGTH, 'foo/bar')).toThrow();
  });

  it('throws if the provided id does not match the templateId in the config', () => {
    expect(() => validCytoConfig(mocks.VALID_CONFIG, 'foo/baz')).toThrow();
  });

  it('throws if the base key is invalid', () => {
    mocks.INVALID_BASE_KEYS.forEach((invalidConfig) => {
      expect(() => validCytoConfig(invalidConfig, 'foo/bar')).toThrow();
    });
  })
});
